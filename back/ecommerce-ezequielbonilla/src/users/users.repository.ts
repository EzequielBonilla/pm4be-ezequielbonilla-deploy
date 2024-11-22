import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = {
    data: [
      {
        id: 1,
        name: 'Jorge',
        email: 'jorge@mail.com',
        password: 'pass123',
        address: 'Calle Falsa 123',
        phone: '123456789',
        country: 'Argentina',
        city: 'Buenos Aires',
      },
      {
        id: 2,
        name: 'Luis',
        email: 'luis@mail.com',
        password: 'pass123',
        address: 'Calle Verdadera 456',
        phone: '987654321',
        country: 'Argentina',
        city: 'Córdoba',
      },
      {
        id: 3,
        name: 'María',
        email: 'maria@mail.com',
        password: 'pass123',
        address: 'Calle Imaginaria 789',
        phone: '456789123',
        country: 'Argentina',
        city: 'Rosario',
      },
    ],
  };

  getUsers() {
    return this.users;
  }

  // async getUser(id: number) {
  //   const user = this.users.find((user) => user.id === id);
  //   if (user) {
  //     const { password, ...userWithoutPassword } = user;
  //     return userWithoutPassword;
  //   }
  //   return null; //manejar error a futuro
  // }

  // async createUser(userData) {
  //   const newUser = { id: this.users.length + 1, ...userData };
  //   this.users.push(newUser);
  //   return newUser.id;
  // }

  // async updateUser(id: number, userData) {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   if (index !== -1) {
  //     this.users[index] = { ...this.users[index], ...userData };
  //     return id;
  //   }
  //   return null; //manejar error a futuro
  // }

  // async deleteUser(id: number) {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   if (index !== -1) {
  //     this.users.splice(index, 1);
  //     return id;
  //   }
  //   return null; //manejar error a futuro
  // }
}
