import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductViewDto } from './product-view.dto';
import { ProductEngagementService } from 'src/product-engagement/product-engagement.service';

@Injectable()
export class ProductViewService {
  constructor(
    private prismaService: DbService,
    private engagementService: ProductEngagementService,
  ) {}
  async createProductView(data: ProductViewDto) {
    try {
      let existingView = await this.prismaService.productView.findFirst({
        where: {
          OR: [
            ...(data.userId ? [{ userId: data.userId }] : []),
            { deviceId: data.deviceId },
          ],
        },
      });
      if (!existingView) {
        existingView = await this.prismaService.productView.create({
          data: { ...data },
        });
        this.engagementService.createOrUpdateProductEngagement(
          {
            productId: existingView.productId,
            score: 1,
          },
          'increment',
        );
      }
      existingView = await this.prismaService.productView.update({
        where: { id: existingView.id },
        data: {
          viewedAt: new Date(),
        },
      });
      return { statusCode: 200, data: existingView };
    } catch (error) {
      throw error;
    }
  }
}
