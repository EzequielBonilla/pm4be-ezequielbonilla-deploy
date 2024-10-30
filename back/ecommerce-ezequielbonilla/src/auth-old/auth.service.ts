import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuths() {
    return 'Retornando auths';
  }
}
