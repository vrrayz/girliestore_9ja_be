import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: DbService) {}

  async categories() {
    const categories = await this.prismaService.category.findMany({});

    return { statusCode: 200, data: categories };
  }

  async findCategory(id: number) {
    try {
      const category = await this.prismaService.category.findUniqueOrThrow({
        where: { id },
        include: {
          products: {
            include: {
              shop: true,
              photos: true,
            },
          },
        },
      });

      return { statusCode: 200, data: category };
    } catch (error) {
      if (error.code == 'P2025')
        throw new NotFoundException('Category not found');
      throw error;
    }
  }
  async createCategory(data: CategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: { ...data },
      });
      return { statusCode: 200, data: category };
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(data: CategoryDto, id: number) {
    const category = await this.prismaService.category.update({
      where: {
        id,
      },
      data,
    });
    return { statusCode: 200, data: category };
  }
  async deleteCategory(id: number) {
    await this.prismaService.category.delete({
      where: {
        id,
      },
    });
    return { statusCode: 200, message: 'Category Deleted' };
  }
}
