import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ShopDto } from './shop.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShopService {
  constructor(
    private prismaService: DbService,
    private userService: UserService,
  ) {}
  async createShop(email: string, data: ShopDto, imageUrl: any) {
    const user = await this.userService.findUser(email);
    if (user.statusCode === 200) {
      try {
        const shop = await this.prismaService.shop.create({
          data: { ...data, ownerId: user.data.id, photo_url: imageUrl },
        });
        return { statusCode: 200, data: shop };
      } catch (error) {
        throw error;
      }
    }
    throw new ForbiddenException('Error fetching user data');
  }
  async findShops() {
    try {
      const shops = await this.prismaService.shop.findMany({
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              bio: true,
              createdAt: true,
            },
          },
        },
      });

      return { statusCode: 200, data: shops };
    } catch (error) {
      throw error;
    }
  }
  async findShop(id: number) {
    try {
      const shop = await this.prismaService.shop.findUniqueOrThrow({
        where: { id },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              bio: true,
              createdAt: true,
            },
          },
          products: {
            include: {
              photos: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      });

      return { statusCode: 200, data: shop };
    } catch (error) {
      if (error.code == 'P2025') throw new ForbiddenException('Shop not found');
      throw error;
    }
  }
  async updateShop(data: ShopDto, id: number) {
    const shop = await this.prismaService.shop.update({
      where: {
        id,
      },
      data,
    });
    return { statusCode: 200, data: shop };
  }
  async deleteShop(id: number) {
    await this.prismaService.shop.delete({
      where: {
        id,
      },
    });
    return { statusCode: 200, message: 'Shop Deleted' };
  }
  async shopAuthorization(shopId: number, email: string) {
    const shop = await this.findShop(shopId);
    const user = await this.userService.findUser(email);
    if (
      shop.data.ownerId !== user.data.id &&
      user.data.role !== 'super_admin' &&
      user.data.role !== 'admin'
    ) {
      throw new ForbiddenException('User not owner of this shop');
    }
  }
}
