import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: DbService) {}
  async findProducts() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          shop: {
            include: { owner: true },
          },
          photos: true,
        },
      });

      return { statusCode: 200, data: products };
    } catch (error) {
      throw error;
    }
  }
  async findProduct(id: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: { id },
        include: {
          shop: {
            include: { owner: true },
          },
          category: true,
          photos: true,
        },
      });

      return { statusCode: 200, data: product };
    } catch (error) {
      if (error.code == 'P2025')
        throw new NotFoundException('Product not found');
      throw error;
    }
  }
  async createProduct(data: ProductDto, photos: string[]) {
    try {
      const product = await this.prismaService.product.create({
        data: {
          ...data,
          photos: {
            create: photos.map((photo) => {
              return { url: photo };
            }),
          },
        },
      });
      return { statusCode: 200, data: product };
    } catch (error) {
      throw error;
    }
  }
  //   async updateCategory(data: CategoryDto, id: number) {
  //     const category = await this.prismaService.category.update({
  //       where: {
  //         id,
  //       },
  //       data,
  //     });
  //     return { statusCode: 200, data: category };
  //   }
  //   async deleteCategory(id: number) {
  //     await this.prismaService.category.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //     return { statusCode: 200, message: 'Category Deleted' };
  //   }
}
