import { AppModule } from '@/app.module';
import { Test } from '@nestjs/testing';

describe('App e2e', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('should pass');
  it.todo('should pass2');
});
