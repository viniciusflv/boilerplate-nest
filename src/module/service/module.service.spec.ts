import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { ModuleClient } from '../client/module.client';

describe('ModuleService', () => {
  let service: ModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleService, ModuleClient],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
