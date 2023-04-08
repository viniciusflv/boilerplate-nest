import { Module } from '@nestjs/common';
import { ModuleClient } from './client/module.client';
import { ModuleService } from './service/module.service';
import { ModuleController } from './controller/module.controller';
import { ModuleResolver } from './resolver/module.resolver';

@Module({
  providers: [ModuleClient, ModuleService, ModuleResolver],
  controllers: [ModuleController],
})
export class ModuleModule {}
