import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    // "value" is an object containing the file's attributes and metadata
    const maxSize = Math.pow(1024, 2) * 2; // 2mb max size
    const validMimeTypes = ['jpeg', 'png'];
    if (value.size > maxSize)
      return { statusCode: 400, message: 'Image size exceeds 2mb' };
    if (validMimeTypes.indexOf(value.mimetype.replace('image/', '')) === -1)
      return {
        statusCode: 400,
        message: 'Image type must be either png or jpeg format',
      };
    return { statusCode: 200, data: value };
  }
}
export interface FileResponse {
  statusCode: number;
  data?: Express.Multer.File;
  message?: undefined;
}
