import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'LogIn de usuario',
    description:
      'Endpoint destinado al log in de usuarios a través de credenciales validas',
  })
  async signIn(@Body() credentials: SignInAuthDto) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Registro de usuario nuevo',
    description:
      'Endpoint que provee la posibilidad de crear usuarios nuevos brindando los datos del mismo',
  })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpUser: SignUpAuthDto) {
    const user = await this.authService.signUp(signUpUser);
    return new UserResponseDto(user);
  }
}
