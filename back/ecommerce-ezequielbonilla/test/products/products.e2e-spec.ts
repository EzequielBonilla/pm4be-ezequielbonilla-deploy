import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'admin@test.com', password: 'Pass1234!' });

    authToken = loginResponse.body['token'];
  });

  afterEach(async () => {
    await app.close();
  });

  it('/products (GET) retorna un array de productos y un status ok', async () => {
    const req = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
