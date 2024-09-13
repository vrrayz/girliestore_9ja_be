import {
  PipeTransform,
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value) return { statusCode: 400, message: 'Image upload not found' };
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
export class ImagesValidationPipe implements PipeTransform {
  transform(value: Array<Express.Multer.File>) {
    if (!value) return { statusCode: 400, message: 'Image upload not found' };
    // "value" is an object containing the file's attributes and metadata
    const maxSize = Math.pow(1024, 2) * 2; // 2mb max size
    const validMimeTypes = ['jpeg', 'png'];
    for (let index = 0; index < value.length; index++) {
      if (value[index].size > maxSize)
        return { statusCode: 400, message: 'Image size exceeds 2mb' };
      if (
        validMimeTypes.indexOf(value[index].mimetype.replace('image/', '')) ===
        -1
      )
        return {
          statusCode: 400,
          message: 'Image type must be either png or jpeg format',
        };
    }
    return { statusCode: 200, data: value };
  }
}

export class ImageLabelsValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value)
      throw new HttpException('No image label found', HttpStatus.BAD_REQUEST);
    console.log('should be here', value);
    // console.log('converted value here', JSON.parse(value));
    const parsedValue = JSON.parse(value);
    const transformedValue = { className: '' };
    try {
      if (parsedValue) {
        if (!Array.isArray(parsedValue))
          throw new BadRequestException(
            'Validation failed: labels must be an array ' +
              typeof value +
              ' received',
          );

        parsedValue.map((label) => {
          if (!label.className)
            throw new BadRequestException(
              'Validation failed: labels must have a class name',
            );
          transformedValue.className += label.className + ',';
        });

        return transformedValue;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
export interface FileResponse {
  statusCode: number;
  data?: Express.Multer.File;
  message?: string;
}
export interface FilesResponse {
  statusCode: number;
  data?: Express.Multer.File[];
  message?: string;
}
