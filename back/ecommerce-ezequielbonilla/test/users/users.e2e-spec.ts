import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { hash } from 'bcrypt';
import * as request from 'supertest';
import * as dotenv from 'dotenv';

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

    // userService = moduleFixture.get<UsersService>(UsersService);
    // const hashedPassword = await hash('Pass1234!', 10);

    // jest.spyOn(userService, 'findByEmail').mockImplementation(async (email) => {
    //   if (email === 'usuariotest@mail.com') {
    //     return Promise.resolve({
    //       email: 'usuariotest@mail.com',
    //       password: hashedPassword,
    //       accessLevel: 'user',
    //     } as User);
    //   } else {
    //     return Promise.resolve(undefined);
    //   }
    // });

    // jest.spyOn(userService, 'findAll').mockImplementation(async () => {
    //   return Promise.resolve([
    //     {
    //       email: 'usuariotest@mail.com',
    //       accessLevel: 'user',
    //     },
    //   ] as User[]);
    // });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'admin@test.com', password: 'Pass1234!' });

    authToken = loginResponse.body['token'];
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET) return array with users and OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);
    console.log('authtoken', authToken);
    console.log('request body', req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
