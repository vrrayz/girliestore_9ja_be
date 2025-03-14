import { Test, TestingModule } from '@nestjs/testing';
import { ProductEngagementService } from './product-engagement.service';

describe('ProductEngagementService', () => {
  let service: ProductEngagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductEngagementService],
    }).compile();

    service = module.get<ProductEngagementService>(ProductEngagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
