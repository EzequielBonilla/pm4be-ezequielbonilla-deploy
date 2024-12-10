import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a mi PM4 de BackEnd. ingresa a /docs para la documentación en Swagger';
  }
}
