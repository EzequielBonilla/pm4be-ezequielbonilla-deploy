import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' || metadata.type === 'query') {
      if (!isUUID(value)) {
        throw new BadRequestException(`Invalid UUID: ${value}`);
      }
    }
    return value;
  }
}
