import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductEngagementDto } from './product-engagement.dto';

@Injectable()
export class ProductEngagementService {
  constructor(private prismaService: DbService) {}

  async createProductEngagement(data: ProductEngagementDto) {
    try {
      const productEngagement =
        await this.prismaService.productEngagement.create({
          data: {
            ...data,
          },
        });
      return { statusCode: 200, data: productEngagement };
    } catch (error) {
      throw error;
    }
  }
}
