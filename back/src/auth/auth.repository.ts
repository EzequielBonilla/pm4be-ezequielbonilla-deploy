import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  private auths = [
    {
      id: 1,
      username: 'jorge123',
      password: 'pass123',
    },
    {
      id: 2,
      username: 'luis123',
      password: 'pass123',
    },
    {
      id: 3,
      username: 'maria123',
      password: 'pass123',
    },
  ];

  async getAuths() {
    return this.auths;
  }
}
