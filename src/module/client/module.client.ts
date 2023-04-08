import { Injectable } from '@nestjs/common';
import { from, of } from 'rxjs';
import { ModuleRequestDTO, ModuleResponseDTO } from './module.client.dto';

@Injectable()
export class ModuleClient {
  private readonly data: Record<string, ModuleRequestDTO>;

  constructor() {
    this.data = {};
  }

  private asyncSimulation<T>(cb: (...args: any[]) => any) {
    return from(
      new Promise<T>((resolve) => {
        setTimeout(() => {
          resolve(cb());
        }, 3000);
      }),
    );
  }

  public create(id: string, data: ModuleRequestDTO) {
    this.data[id] = data;
    return this.asyncSimulation<ModuleResponseDTO>(() => ({
      ...this.data[id],
      id,
    }));
  }

  public read(id: string) {
    return of(this.data[id] || { name: '' });
  }

  public update(id: string, data) {
    return this.asyncSimulation<ModuleResponseDTO>(() => {
      this.data[id] = data;
      return this.data[id];
    });
  }

  public delete(id: string) {
    return this.asyncSimulation(() => {
      this.data[id] = undefined;
      return this.data[id];
    });
  }

  public scan() {
    return of(this.data);
  }
}
