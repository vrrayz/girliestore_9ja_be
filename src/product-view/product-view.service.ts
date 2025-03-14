import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductViewDto } from './product-view.dto';

@Injectable()
export class ProductViewService {
  constructor(private prismaService: DbService) {}
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
        await this.prismaService.productEngagement.upsert({
          where: {
            productId: existingView.productId,
          },
          create: {
            productId: existingView.productId,
            score: 1,
          },
          update: {
            score: { increment: 1 },
          },
        });
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
