export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
  orders: { id: string; date: Date }[];

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, address, phone, country, city, orders } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
    //this.orders = orders.map((order) => ({ id: order.id, date: order.date }));
    this.orders = (orders || []).map((order) => ({
      id: order.id,
      date: order.date,
    }));
  }
}
