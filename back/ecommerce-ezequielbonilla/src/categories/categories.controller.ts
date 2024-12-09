import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una categoria',
    description:
      'Este endpoint está destinado a la creación de categorias por parte de los administradores.',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Traer listado de categorias',
    description: 'Endpoint para traer todas las cartegorias disponibles.',
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriesService.findAll();
  }

  // @Get(':id')
  // @UsePipes(UuidValidationPipe)
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(id);
  // }

  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(id, updateCategoryDto);
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // @UsePipes(UuidValidationPipe)
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(id);
  // }
}
