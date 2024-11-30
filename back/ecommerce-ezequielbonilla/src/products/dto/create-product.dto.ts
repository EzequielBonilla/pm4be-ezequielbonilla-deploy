import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsUrl()
  imgUrl: string;
}
