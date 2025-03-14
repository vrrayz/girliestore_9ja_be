import { Test, TestingModule } from '@nestjs/testing';
import { ProductViewController } from './product-view.controller';

describe('ProductViewController', () => {
  let controller: ProductViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductViewController],
    }).compile();

    controller = module.get<ProductViewController>(ProductViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
