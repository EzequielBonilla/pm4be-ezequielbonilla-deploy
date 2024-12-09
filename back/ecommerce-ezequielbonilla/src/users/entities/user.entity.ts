import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/shared/enums/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    example: 'Usuario Ejemplo',
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  @ApiProperty({
    example: 'ejemplo@ejemplo.com',
  })
  email: string;

  @Column({
    nullable: false,
  })
  @ApiProperty({
    example: 'Pass1234!',
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @ApiProperty({
    example: 'Calle 123',
  })
  address: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    example: '12345678',
  })
  phone: number;

  @Column({ nullable: true, length: 50 })
  @ApiProperty({
    example: 'Argentina',
  })
  country: string;

  @Column({ nullable: true, length: 50 })
  @ApiProperty({
    example: 'Capital Federal',
  })
  ciudad: string;

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({ type: () => Order, example: 'orders list for this user' })
  orders: Order[];

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @ApiProperty({
    example: 'Role hidden from GETs. Default = user',
  })
  accessLevel: Role;
}
