import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUser: SignUpAuthDto) {
    const existingUser = await this.userService.findByEmail(signUpUser.email);
    if (existingUser) {
      throw new HttpException('Email already in use', 400);
    }

    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', 400);
    }

    signUpUser.password = await hash(signUpUser.password, 10);
    return await this.userService.create(signUpUser);
  }

  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = await compare(signInUser.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.createToken(user);
    return { token };
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      accessLevel: user.accessLevel,
    };

    return this.jwtService.signAsync(payload);
  }
}
