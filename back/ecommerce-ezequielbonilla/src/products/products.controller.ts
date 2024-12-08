import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Product } from './entities/product.entity';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadValidationPipe } from 'src/pipes/image-upload-validation.pipe';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Traer listado de productos',
    description:
      'Este endpoint brinda el listado completo de productos, abierto incluiso para usuarios no registrados.',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Traer un producto especifico',
    description:
      'Endpoint con la logica para traer un producto y sus datos a través de su ID, tambien abierto a invitados',
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Creación de producto',
    description:
      'Este endpoint permite agregar productos a la base de datos, brindado sus características.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edición de producto especifico',
    description:
      'Enpoint creado para la modificación de las caracteristicas de productos en particular.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Post('upload/:id')
  @ApiOperation({
    summary: 'Agregar imagen a producto especifico',
    description:
      'Endpoint que nos permite subir una imagen por formulario a un servicio nube, y asignarle la misma al producto con el URL.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadValidationPipe()) file: Express.Multer.File,
  ) {
    return this.productsService.uploadFile(file, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto',
    description:
      'Con este endpoint borramos definitivamente un producto de la base de datos a través del ID.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(UuidValidationPipe)
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
