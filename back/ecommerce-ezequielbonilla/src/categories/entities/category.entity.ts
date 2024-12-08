import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
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
    example: 'Monitor',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
