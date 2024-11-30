import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // constructor(private readonly userRepository: UsersRepository) {}
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // create(createUserDto: CreateUserDto): User {
  //   return this.userRepository.create(createUserDto);
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.getUsers();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }

  pag(page: number, limit: number) {
    return { page, limit };
  }
}
