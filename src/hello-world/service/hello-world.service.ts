import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { logHandler } from '../../utils/log-handler';
import { HelloWorldClient } from '../client/hello-world.client';
import { HelloWorldRequest } from '../client/request/hello-world';

@Injectable()
export class HelloWorldService {
  @InjectPinoLogger(HelloWorldService.name) private readonly logger: PinoLogger;

  constructor(private readonly helloWorldClient: HelloWorldClient) {}

  getHelloWorld() {
    return logHandler(this.helloWorldClient.getHelloWorld(), {
      logger: this.logger,
      message: 'pegar o olá mundo',
    });
  }

  setHelloWorld(helloWorld: HelloWorldRequest) {
    return logHandler(this.helloWorldClient.setHelloWorld(helloWorld), {
      logger: this.logger,
      message: 'atualizar o olá mundo',
    });
  }
}
