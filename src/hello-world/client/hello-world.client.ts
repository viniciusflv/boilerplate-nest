import { Observable, of } from 'rxjs';
import { ConfigService } from 'nestjs-config';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { map } from 'rxjs/operators';

import { logHandler } from '../../utils/log-handler';
import { HelloWorldConfig } from '../hello-world.config';
import { HelloWorldRequest } from './request/hello-world';
import { HelloWorldResponse } from './response/hello-world';

@Injectable()
export class HelloWorldClient {
  @InjectPinoLogger(HelloWorldClient.name) private readonly logger: PinoLogger;

  private readonly baseUrl: ReturnType<HelloWorldConfig['baseUrl']>;
  private message: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.message = 'Olá mundo!';
    this.baseUrl = this.config.get('hello-world').baseUrl();
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

  private call() {
    return logHandler(
      this.http
        .get<HelloWorldResponse>(`${this.baseUrl}/hello-world`)
        .pipe(map(({ data }) => data)),
      {
        logger: this.logger,
        message: 'pegar o olá mundo',
      },
    );
  }
}
