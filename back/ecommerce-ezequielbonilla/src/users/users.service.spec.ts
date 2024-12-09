import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(new User()),
            save: jest.fn().mockResolvedValue(new User()),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('create() deberia crear un usuario y retornarlo', async () => {
    const userDto = {
      name: 'Usuario para Test',
      email: 'usuariotest@mail.com',
      password: 'Pass1234!',
      address: 'Calle 123',
      phone: 12345678,
    };
    const createdUser = new User();
    createdUser.id = '123';
    createdUser.name = userDto.name;
    createdUser.email = userDto.email;

    repository.create = jest.fn().mockReturnValue(createdUser);
    repository.save = jest.fn().mockResolvedValue(createdUser);

    const user = await service.create(userDto);
    expect(user).toEqual(createdUser);
    expect(user.id).toBe('123');
  });

  it('findByEmail() debería encontrar un usuario por email y retornarlo', async () => {
    const email = 'usuariotest@mail.com';
    const user = new User();
    user.email = email;
    repository.findOne = jest.fn().mockResolvedValue(user);

    const foundUser = await service.findByEmail(email);
    expect(foundUser).toEqual(user);
    expect(foundUser.email).toBe(email);
  });

  it('remove() deberia borrar un usuario y devolver undefined', async () => {
    const userId = '123';
    const result = await service.remove(userId);
    expect(result).toBeUndefined();
  });

  it('findAll() deberia retornar el array de usuarios', async () => {
    const users = await service.findAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(0);
  });
});
