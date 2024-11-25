import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInAuthDto } from './dto/singin-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  singIn(@Body() credentials: SingInAuthDto) {
    return this.authService.singIn(credentials);
  }
}
