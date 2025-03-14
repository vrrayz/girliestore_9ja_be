import { Test, TestingModule } from '@nestjs/testing';
import { ProductEngagementController } from './product-engagement.controller';

describe('ProductEngagementController', () => {
  let controller: ProductEngagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductEngagementController],
    }).compile();

    controller = module.get<ProductEngagementController>(ProductEngagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
