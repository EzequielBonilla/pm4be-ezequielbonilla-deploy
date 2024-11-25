import { PartialType } from '@nestjs/mapped-types';
import { SingInAuthDto } from './singin-auth.dto';

export class UpdateAuthDto extends PartialType(SingInAuthDto) {}
