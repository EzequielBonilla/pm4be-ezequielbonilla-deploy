import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/shared/enums/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  phone: number;

  @Column({ nullable: true, length: 50 })
  country: string;

  @Column({ nullable: true, length: 50 })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ type: 'enum', enum: Role, default: Role.User })
  accessLevel: Role;
}
