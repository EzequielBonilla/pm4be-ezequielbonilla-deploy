import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() userData) {
    return this.usersService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userData) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
