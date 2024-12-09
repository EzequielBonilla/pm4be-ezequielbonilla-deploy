import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Traer todos los usuarios',
    description:
      'Este endpoint brinda un listado de todos los usuarios registrados con sus datos, excepto parametros sensibles.',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get('pag')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Query para paginación',
    description:
      'Este endpoint está destinado a futuras configuraciónes de paginación.',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  findWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.usersService.pag(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Traer usuario especifico',
    description:
      'Este endpoint permite traer los datos de un usuario especifico a través de la ID enviada.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new UserResponseDto(user);
  }

  @Post()
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserResponseDto(user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar usuario especifico',
    description:
      'Este endpoint nos pemite modificar los datos de un usuario, exceptuando el rol por seguridad',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrar un usuario especifico',
    description:
      'Este endpoint se dedica a borrar un usuario de la base de datos a través de un ID.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
