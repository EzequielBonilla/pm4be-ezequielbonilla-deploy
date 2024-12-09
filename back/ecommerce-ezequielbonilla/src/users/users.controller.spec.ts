import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/response-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            remove: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(
              new UserResponseDto({
                id: '123',
                name: 'Updated User',
                email: 'updated@example.com',
              }),
            ),
          },
        },
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => ({
            canActivate: jest.fn().mockReturnValue(true),
          })),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('remove() deberia eliminar un usuario y retornar un mensaje de exito', async () => {
    const userId = '123';
    const result = await controller.remove(userId);
    expect(result).toEqual({ message: 'User deleted successfully' });
    expect(service.remove).toHaveBeenCalledWith(userId);
  });

  it('update() deberia actualizar un usuario y retornar un mensaje de exito junto al usuario', async () => {
    const userId = '123';
    const updateDto = { name: 'Updated User' };
    const updatedUser = await controller.update(userId, updateDto);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.message).toBe('User updated successfully');
    expect(service.update).toHaveBeenCalledWith(userId, updateDto);
  });
});
