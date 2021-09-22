import { HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HelloWorldService } from './hello-world.service';
import { HelloWorldClient } from '../client/hello-world.client';
import {
  mockSuccess,
  mockError,
  createTestingModule,
} from '../../../test/utils/test-util';
import { getHelloWorldMock } from '../../../test/mocks/hello-wold/get-hello-world.mock';
import { setHelloWorldMock } from '../../../test/mocks/hello-wold/set-hello-world.mock';

describe('HelloWorldService', () => {
  let client: HelloWorldClient;
  let service: HelloWorldService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [HelloWorldClient, HelloWorldService],
    }).compile();

    client = module.get<HelloWorldClient>(HelloWorldClient);
    service = module.get<HelloWorldService>(HelloWorldService);
  });

  it('Deve estar definido', () => {
    expect(client).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getHelloWorld - Pegar olá mundo', () => {
    test('Deve pegar olá mundo', (done) => {
      jest
        .spyOn(client, 'getHelloWorld')
        .mockReturnValue(mockSuccess(getHelloWorldMock));

      service.getHelloWorld().subscribe((res) => {
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
        .spyOn(client, 'getHelloWorld')
        .mockReturnValue(mockError('Error', HttpStatus.BAD_REQUEST));

      service.getHelloWorld().subscribe({
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
        .spyOn(client, 'setHelloWorld')
        .mockReturnValue(mockSuccess(setHelloWorldMock));

      service.setHelloWorld(setHelloWorldMock).subscribe((res) => {
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
        .spyOn(client, 'setHelloWorld')
        .mockReturnValue(mockError('Error', HttpStatus.BAD_REQUEST));

      service.setHelloWorld(setHelloWorldMock).subscribe({
        error: (err) => {
          expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
          expect(err().message).toEqual('Error');
          done();
        },
      });
    });
  });
});
