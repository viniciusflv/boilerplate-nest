import { HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HelloWorldResolver } from './hello-world.resolver';
import { HelloWorldClient } from '../../client/hello-world.client';
import { HelloWorldService } from '../../service/hello-world.service';
import {
  mockSuccess,
  mockError,
  createTestingModule,
} from '../../../../test/utils/test-util';
import { getHelloWorldMock } from '../../../../test/mocks/hello-wold/get-hello-world.mock';
import { setHelloWorldMock } from '../../../../test/mocks/hello-wold/set-hello-world.mock';

describe('HelloWorldResolver', () => {
  let service: HelloWorldService;
  let resolver: HelloWorldResolver;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [HelloWorldClient, HelloWorldService, HelloWorldResolver],
    }).compile();

    service = module.get<HelloWorldService>(HelloWorldService);
    resolver = module.get<HelloWorldResolver>(HelloWorldResolver);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  describe('helloWorld - Pegar olá mundo', () => {
    test('Deve pegar olá mundo', (done) => {
      jest
        .spyOn(service, 'getHelloWorld')
        .mockReturnValue(mockSuccess(getHelloWorldMock));

      resolver.helloWorld().subscribe((res) => {
        expect(res).toMatchInlineSnapshot(`
          Object {
            "helloWorld": "Olá mundo!",
          }
        `);
        done();
      });
    });

    test('Deve NÃO pegar olá mundo', (done) => {
      jest
        .spyOn(service, 'getHelloWorld')
        .mockReturnValue(mockError('Error', HttpStatus.BAD_REQUEST));

      resolver.helloWorld().subscribe({
        error: (err) => {
          expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
          expect(err().message).toEqual('Error');
          done();
        },
      });
    });
  });

  describe('setHelloWorld - Atualizar olá mundo', () => {
    test('Deve atualizar olá mundo', (done) => {
      jest
        .spyOn(service, 'setHelloWorld')
        .mockReturnValue(mockSuccess(setHelloWorldMock));

      resolver.setHelloWorld('Hello world!').subscribe((res) => {
        expect(res).toMatchInlineSnapshot(`
            Object {
              "helloWorld": "Hello world!",
            }
          `);
        done();
      });
    });

    test('Deve NÃO atualizar olá mundo', (done) => {
      jest
        .spyOn(service, 'setHelloWorld')
        .mockReturnValue(mockError('Error', HttpStatus.BAD_REQUEST));

      resolver.setHelloWorld('Hello world!').subscribe({
        error: (err) => {
          expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
          expect(err().message).toEqual('Error');
          done();
        },
      });
    });
  });
});
