import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('Pass1234!', 10);
    const mockUserService: Partial<UsersService> = {
      findByEmail: (email: string) => {
        if (email === 'usuariotest@mail.com') {
          return Promise.resolve({
            email: 'usuariotest@mail.com',
            password: hashedPassword,
            accessLevel: 'user',
          } as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (entityLike?: Partial<User>) =>
        Promise.resolve({
          ...entityLike,
          id: 'f3e4a21d-7f5a-4bda-b347-5ef697b7d981',
          accessLevel: 'user',
        } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: {} },
        {
          provide: JwtService,
          useValue: { signAsync: () => Promise.resolve('mockJwtToken') },
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const mockSignUpUser = new SignUpAuthDto({
    name: 'Usuario para Test',
    email: 'authctrltest@mail.com',
    password: 'Pass1234!',
    passwordConfirm: 'Pass1234!',
    address: 'Calle 123',
    phone: 12345678,
    country: 'Argentina',
    city: 'Capital Federal',
  });

  const mockSignInUser = new SignInAuthDto({
    email: 'usuariotest@mail.com',
    password: 'Pass1234!',
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signUp() deberìa retornar un nuevo UserResponseDto y crear User', async () => {
    const user = await controller.signUp(mockSignUpUser);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserResponseDto);
    expect(user).toHaveProperty('id');
  });

  it('signIn() deberìa retornar un token', async () => {
    const token = await controller.signIn(mockSignInUser);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
  });

  it('signUp() debería lanzar un error si los datos son inválidos', async () => {
    const invalidUser = { ...mockSignUpUser, email: '' };
    await expect(controller.signUp(invalidUser)).rejects.toThrow();
  });

  it('signIn() debería lanzar un error si las credenciales son incorrectas', async () => {
    const invalidSignIn = { ...mockSignInUser, password: 'ContraseñaErronea' };
    await expect(controller.signIn(invalidSignIn)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
