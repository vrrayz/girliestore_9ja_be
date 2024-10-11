import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ProductRecommendationDto } from './product-recommendation.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductRecommendationService {
  constructor(
    private prismaService: DbService,
    private userService: UserService,
  ) {}

  async createRecommendation(email: string, data: ProductRecommendationDto) {
    try {
      const user = await this.userService.findUser(email);
      //   check if the recommendation for this user already exists. if it doesn't then create it
      const recommendation =
        await this.prismaService.productRecommendation.findFirst({
          where: { userId: user.data.id, productId: data.productId },
        });
      if (!recommendation) {
        const productRecommendation =
          await this.prismaService.productRecommendation.create({
            data: {
              productId: data.productId,
              userId: user.data.id,
            },
          });
        return { statusCode: 200, data: productRecommendation };
      }
      return { statusCode: 200, data: recommendation };
    } catch (error) {
      throw error;
    }
  }

  async findRecommendations(email: string, limit?: number) {
    try {
      const user = await this.userService.findUser(email);
      const recommendations =
        await this.prismaService.productRecommendation.findMany({
          where: { userId: user.data.id },
          include: {
            product: {
              include: { photos: true },
            },
          },
          take: limit || 5,
        });
      return { statusCode: 200, data: recommendations };
    } catch (error) {
      throw error;
    }
  }
}
