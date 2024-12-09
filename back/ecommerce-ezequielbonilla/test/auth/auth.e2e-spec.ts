import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/signin (POST) deberia retorna un token valido con status OK', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'admin@test.com', password: 'Pass1234!' });

    expect(loginResponse.status).toBe(201);
    expect(loginResponse.body).toHaveProperty('token');
  });

  it('/auth/signin (POST) deberia retornar status 201 y error de credenciales invalidas', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'invalid@test.com', password: 'wrongpassword' });

    expect(loginResponse.status).toBe(401);
    expect(loginResponse.body).toHaveProperty('message', 'Invalid credentials');
  });
});
