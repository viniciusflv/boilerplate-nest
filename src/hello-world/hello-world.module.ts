import { Module, HttpModule } from '@nestjs/common';

import { HelloWorldClient } from './client/hello-world.client';
import { HelloWorldService } from './service/hello-world.service';
import { HelloWorldResolver } from './api/graphql/hello-world.resolver';
import { HelloWorldController } from './api/rest/hello-world.controller';

@Module({
  imports: [HttpModule],
  providers: [HelloWorldClient, HelloWorldService, HelloWorldResolver],
  controllers: [HelloWorldController],
})
export class HelloWorldModule {}
