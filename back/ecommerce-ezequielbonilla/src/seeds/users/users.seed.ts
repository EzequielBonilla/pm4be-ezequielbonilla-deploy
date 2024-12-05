import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { usersMock } from './users-mock';

@Injectable()
export class UsersSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const existingUser = (await this.userRepository.find()).map(
      (user) => user.name,
    );
    for (const userData of usersMock) {
      if (!existingUser.includes(userData.name)) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = await hash(userData.password, 10);
        user.address = userData.address;
        user.phone = userData.phone;
        user.country = userData.country;
        user.city = userData.city;
        user.accessLevel = userData.accessLevel;
        await this.userRepository.save(user);
      }
    }
  }
}
