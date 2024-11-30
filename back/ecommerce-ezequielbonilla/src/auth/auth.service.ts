import { Injectable } from '@nestjs/common';
import { SingInAuthDto } from './dto/singin-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async singIn(credentials: SingInAuthDto) {
    const user = await this.userService.findByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return 'Logeado con exito';
    }
    return 'Credenciales invalidas';
  }
}
