import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductEngagementDto } from './product-engagement.dto';

@Injectable()
export class ProductEngagementService {
  constructor(private prismaService: DbService) {}

  async createOrUpdateProductEngagement(
    data: ProductEngagementDto,
    scoreAction: 'increment' | 'decrement',
  ) {
    try {
      const productEngagement =
        await this.prismaService.productEngagement.upsert({
          where: {
            productId: data.productId,
          },
          create: {
            productId: data.productId,
            score: data.score,
          },
          update: {
            score: { [scoreAction]: data.score },
          },
        });
      return { statusCode: 200, data: productEngagement };
    } catch (error) {
      throw error;
    }
  }
}
