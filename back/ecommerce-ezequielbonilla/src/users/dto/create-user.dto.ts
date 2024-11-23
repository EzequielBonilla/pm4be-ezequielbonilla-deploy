import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(10, 30)
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
  address: string;

  @IsString()
  phone: string;

  //   @IsString()
  //   @IsOptional()
  //   country?: string;

  //   @IsString()
  //   @IsOptional()
  //   city?: string;

  @IsString()
  country: string | undefined;

  @IsString()
  city: string | undefined;
}
