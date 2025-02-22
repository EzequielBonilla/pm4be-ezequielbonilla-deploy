import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Usuario Ejemplo',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'ejemplo@ejemplo.com',
  })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/, {
    message:
      'La contraseña debe tener entre 8 y 20 caracteres, con al menos una letra mayúscula, una letra minúscula y un carácter especial.',
  })
  @IsString()
  @ApiProperty({
    example: 'Pass1234!',
  })
  password: string;

  @IsString()
  @Length(3, 80)
  @ApiProperty({
    example: 'Calle 123',
  })
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678',
  })
  phone: number;

  @IsString()
  @Length(5, 20)
  @IsOptional()
  @ApiProperty({
    example: 'Argentina',
  })
  country?: string;

  @IsString()
  @Length(5, 20)
  @IsOptional()
  city?: string;
}
