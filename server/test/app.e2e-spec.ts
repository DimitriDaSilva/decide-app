import { AppModule } from '@/app.module';
import { AuthDto } from '@/auth/dto';
import { UpdateTableDto } from '@/table/update-table.dto';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: 'postgresql://postgres:postgres@127.0.0.1:5433',
          keepConnectionAlive: true,
          dropSchema: true,
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

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
  });

  describe('Tables', () => {
    it('throw an exception if access_token not provided', () => {
      return pactum.spec().get('/tables').expectStatus(401);
    });

    it('should create a new table', () => {
      return pactum
        .spec()
        .post('/tables')
        .withBody({ title: 'New table' })
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectStatus(201)
        .stores('tableId', 'id')
        .stores('tableTitle', 'title');
    });

    it('should get all the tables', () => {
      return pactum
        .spec()
        .get('/tables')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectJsonLike([{ title: '$S{tableTitle}', id: '$S{tableId}' }])
        .expectStatus(200);
    });

    it('should get a single table', () => {
      return pactum
        .spec()
        .get('/tables/$S{tableId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectJsonLike({ title: '$S{tableTitle}', id: '$S{tableId}' })
        .expectStatus(200);
    });

    it('should update a table', async () => {
      const body: UpdateTableDto = { title: 'New title' };

      await pactum
        .spec()
        .put('/tables/$S{tableId}')
        .withBody(body)
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectStatus(200);

      return pactum
        .spec()
        .get('/tables/$S{tableId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectJsonLike(body)
        .expectStatus(200);
    });

    it('should delete a table', () => {
      return pactum
        .spec()
        .delete('/tables/$S{tableId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectStatus(204);
    });
  });
});
