import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductDto } from './product.dto';
import { SortOrder } from 'src/db/types';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: DbService,
    private categoryService: CategoryService,
  ) {}
  async findProducts(sortOrder?: SortOrder) {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          shop: {
            include: { owner: true },
          },
          photos: true,
        },
        orderBy: [{ createdAt: sortOrder || 'asc' }],
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
      const subCategory = await this.prismaService.subCategory.findFirstOrThrow(
        { where: { id: data.subCategoryId } },
      );
      // console.log('The sub category is ', subCategory);
      if (subCategory.categoryId !== data.categoryId) {
        throw new BadRequestException(
          'Sub category and Category does not match',
        );
      }
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
  async findProductsByLabel(label: string, sortOrder?: SortOrder) {
    const labels = label.split(',');
    try {
      for (let index = 0; index < labels.length; index++) {
        const products = await this.prismaService.product.findMany({
          where: {
            imageLabels: {
              path: '$.className',
              string_contains: labels[index],
            },
          },
          include: {
            shop: {
              include: { owner: true },
            },
            photos: true,
          },
          orderBy: [{ createdAt: sortOrder || 'asc' }],
        });
        if (products.length > 0) return { statusCode: 200, data: products };
      }
      return { statusCode: 200, data: [] };
    } catch (error) {
      throw error;
    }
  }
  async findRandomProductsBySubCategory(subCategoryId: number, limit?: number) {
    try {
      const products: any = await this.prismaService
        .$queryRaw`SELECT * FROM Product WHERE subCategoryId=${subCategoryId} ORDER BY RAND() LIMIT ${
        limit || 10
      }`; //this gives me a joined result with duplicate IDs so i have to reduce to take care of the duplicates
      return { statusCode: 200, data: products };
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
  async deleteProduct(id: number) {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    });
    return { statusCode: 200, message: 'Product Deleted' };
  }
}
