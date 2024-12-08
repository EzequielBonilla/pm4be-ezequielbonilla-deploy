import { ApiProperty } from '@nestjs/swagger';
import { OrderResponseForUserDto } from 'src/orders/dto/response-order-for-user.dto';

export class UserResponseDto {
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
  })
  id: string;

  @ApiProperty({
    example: 'Usuario Ejemplo',
  })
  name: string;

  @ApiProperty({
    example: 'ejemplo@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    example: 'Calle 123',
  })
  address: string;

  @ApiProperty({
    example: '12345678',
  })
  phone: number;

  @ApiProperty({
    example: 'Argentina',
  })
  country?: string;

  @ApiProperty({
    example: 'Capital Federal',
  })
  city?: string;

  @ApiProperty({
    example: 'order list fot this user',
  })
  orders: OrderResponseForUserDto[];

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, address, phone, country, city, orders } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
    this.orders = (orders || []).map(
      (order) => new OrderResponseForUserDto(order),
    );
  }
}
