import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123456ef-123e-123e-123e-1234567890ef',
  })
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @ApiProperty({ type: () => User })
  user: User;

  @Column()
  @ApiProperty({
    example: '2024.12.08',
  })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail;
}
