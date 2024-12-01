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
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/, {
    message:
      'La contraseña debe tener entre 8 y 20 caracteres, con al menos una letra mayúscula, una letra minúscula y un carácter especial.',
  })
  @IsString()
  password: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @Length(5, 20)
  @IsOptional()
  country?: string;

  @IsString()
  @Length(5, 20)
  @IsOptional()
  city?: string;
}
