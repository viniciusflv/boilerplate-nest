import { applyDecorators, UseGuards } from '@nestjs/common';

import { HelloWorldGuard } from '../guards/hello-world.guard';

export const HelloWorldDecorator = () =>
  applyDecorators(UseGuards(HelloWorldGuard));
