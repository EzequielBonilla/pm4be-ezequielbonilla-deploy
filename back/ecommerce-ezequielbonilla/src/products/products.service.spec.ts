import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;
  let fileUploadService: FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(new Product()),
            save: jest.fn().mockResolvedValue(new Product()),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: FileUploadService,
          useValue: {
            uploadFile: jest
              .fn()
              .mockResolvedValue('http://example.com/image.jpg'),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    fileUploadService = module.get<FileUploadService>(FileUploadService);
  });

  it('create() debería crear un poducto y retornarlo', async () => {
    const productDto = {
      name: 'producto test',
      description: 'descripción del producto',
      price: 100,
      stock: 10,
      imgUrl: 'Url',
    };
    const createdProduct = new Product();
    createdProduct.id = '123';
    createdProduct.name = productDto.name;

    repository.create = jest.fn().mockReturnValue(createdProduct);
    repository.save = jest.fn().mockResolvedValue(createdProduct);

    const product = await service.create(productDto);
    expect(product).toEqual(createdProduct);
    expect(product.id).toBe('123');
  });

  it('findOne() debería encontrar un producto y retornarlo', async () => {
    const productId = '123';
    const product = new Product();
    product.id = productId;
    repository.findOne = jest.fn().mockResolvedValue(product);

    const foundProduct = await service.findOne(productId);
    expect(foundProduct).toEqual(product);
    expect(foundProduct.id).toBe(productId);
  });

  it('remove() deberia eliminar un producto y retornar undefined ', async () => {
    const productId = '123';
    const result = await service.remove(productId);
    expect(result).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(productId);
  });

  it('findAll() deberia retornar un array de productos', async () => {
    const products = await service.findAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products).toHaveLength(0);
  });
});
