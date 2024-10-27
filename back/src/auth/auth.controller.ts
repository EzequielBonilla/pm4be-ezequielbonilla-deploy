import { Controller, Post, Body } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post('signin')
  async signIn(@Body() body) {
    const { email, password } = body;
    if (!email || !password) {
      return 'Email y password son requeridos';
    }
    const users = await this.usersRepository.getUsers(); // Esperar a que se resuelva
    const user = users.find((user) => user.email === email);
    if (!user || user.password !== password) {
      return 'Email o password incorrectos';
    }
    return { message: 'Login exitoso' };
  }
}
