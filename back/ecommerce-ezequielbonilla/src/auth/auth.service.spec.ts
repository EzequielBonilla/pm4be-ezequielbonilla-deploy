import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Role } from 'src/shared/enums/roles.enum';
import { SignInAuthDto } from './dto/signin-auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UsersService> = {
      findByEmail: () => Promise.resolve(undefined),
      create: (entityLike?: Partial<User>) =>
        Promise.resolve({
          ...entityLike,
          id: 'f3e4a21d-7f5a-4bda-b347-5ef697b7d981',
          accessLevel: 'user',
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new SignUpAuthDto({
    name: 'Usuario para Test',
    email: 'usuariotest@mail.com',
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
    expect(service).toBeDefined();
  });

  it('signUp() deberìa crear un usuario con password encriptada', async () => {
    const user = await service.signUp(mockUser);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('accessLevel', Role.User);
    expect(user).toHaveProperty('password');
  });

  it('signUp() debería lanzar error si los correos ya existen', async () => {
    jest
      .spyOn(service['userService'], 'findByEmail')
      .mockResolvedValueOnce({} as User);

    await expect(service.signUp(mockUser)).rejects.toThrow(
      'Email already in use',
    );
  });

  it('signUp() debería lanzar error si las contraseñas no coinciden', async () => {
    const invalidUser = { ...mockUser, passwordConfirm: 'Diferente123!' };

    await expect(service.signUp(invalidUser)).rejects.toThrow(
      'Passwords do not match',
    );
  });

  it('signIn() debería lanzar error si el usuario no existe', async () => {
    jest
      .spyOn(service['userService'], 'findByEmail')
      .mockResolvedValueOnce(undefined);

    await expect(service.signIn(mockSignInUser)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
