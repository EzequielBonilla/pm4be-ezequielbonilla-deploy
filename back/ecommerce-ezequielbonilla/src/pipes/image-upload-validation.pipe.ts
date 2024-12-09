import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
  ];

  private readonly maxSizeInBytes = 204800; //200kb
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file recieved');
    }
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('File exceeds max size');
    }
    return file;
  }
}
