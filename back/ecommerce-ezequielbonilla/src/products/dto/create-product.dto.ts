import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 20)
  @ApiProperty({
    example: 'Monitor LG',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'MOnitor LG LED 999999999hz',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: '200.99',
  })
  price: number;

  @IsNumber()
  @ApiProperty({
    example: '2',
  })
  stock: number;

  @IsUrl()
  @ApiProperty({
    example: 'Default picture',
  })
  imgUrl: string;
}
