import { Test, TestingModule } from '@nestjs/testing';
import { ModuleClient } from './module.client';

describe('ModuleClient', () => {
  let service: ModuleClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleClient],
    }).compile();

    service = module.get<ModuleClient>(ModuleClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
