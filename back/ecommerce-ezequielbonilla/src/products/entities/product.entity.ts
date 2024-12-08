import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'https://i.ytimg.com/vi/ha8CpobEYRc/hq720.jpg',
  })
  imgUrl: string;

  @ApiProperty({
    example: 'not used in response',
    description:
      'Relacion de n:1 con Categories, no utilizado en el llamadon, pensado para filtros',
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    example: 'not used in response',
    description:
      'Relacion de n:n con Order Details, no utilizado en el llamado',
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}
