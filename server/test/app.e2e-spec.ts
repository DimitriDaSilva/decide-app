import { AppModule } from '@/app.module';
import { AuthDto } from '@/auth/dto';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const body: AuthDto = {
      email: 'test@gmail.com',
      password: 'superpassword',
    };

    describe('Signup', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...body, email: '' })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...body, password: '' })
          .expectStatus(400);
      });

      it('should throw exception if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(201);
      });
    });

    describe('Log in', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...body, email: '' })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...body, password: '' })
          .expectStatus(400);
      });

      it('should throw exception if no body', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      it('should log in', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(body)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
    });

    describe('Log out', () => {
      it('should log out', () => {
        return pactum
          .spec()
          .post('/auth/logout')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });

      it('throw an exception if access_token not provided', () => {
        return pactum
          .spec()
          .get('/tables')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(401);
      });

      it('should log back in', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(body)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
    });
  });

  describe('Tables', () => {
    it('throw an exception if access_token not provided', () => {
      return pactum.spec().get('/tables').expectStatus(401);
    });

    it('should get all the tables for a user', () => {
      return pactum
        .spec()
        .get('/tables')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectJson({ message: 'all tables' })
        .expectStatus(200);
    });
  });
});
