import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userService: UsersService;

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

  it('/users (GET) retorna un array de usuarios y un status ok', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
