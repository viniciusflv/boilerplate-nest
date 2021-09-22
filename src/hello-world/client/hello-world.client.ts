import { Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { HelloWorldResponse } from './response/hello-world';
import { HelloWorldRequest } from './request/hello-world';
import { logHandler } from '../../utils/log-handler';

@Injectable()
export class HelloWorldClient {
  @InjectPinoLogger(HelloWorldClient.name) private readonly logger: PinoLogger;

  private message: string;

  constructor() {
    this.message = 'Olá mundo!';
  }

  getHelloWorld(): Observable<HelloWorldResponse> {
    return logHandler(of({ helloWorld: this.message }), {
      logger: this.logger,
      message: 'pegar o olá mundo',
    });
  }

  setHelloWorld({ helloWorld }: HelloWorldRequest) {
    this.message = helloWorld;

    return logHandler(of({ helloWorld }), {
      logger: this.logger,
      message: 'atualizar o olá mundo',
    });
  }
}
