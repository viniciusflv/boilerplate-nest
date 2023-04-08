import { Injectable } from '@nestjs/common';
import { ModuleClient } from '../client/module.client';
import { ModuleRequestDTO } from './module.service.dto';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleClient: ModuleClient) {}

  public create(data: ModuleRequestDTO) {
    return this.moduleClient.create(Math.random().toString(), data);
  }

  public read(id: string) {
    return this.moduleClient.read(id);
  }

  public update(id: string, data: ModuleRequestDTO) {
    return this.moduleClient.update(id, data);
  }

  public delete(id: string) {
    return this.moduleClient.delete(id);
  }

  public scan() {
    return this.moduleClient.scan();
  }
}
