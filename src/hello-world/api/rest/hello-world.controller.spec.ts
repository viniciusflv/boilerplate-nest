import { HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HelloWorldController } from './hello-world.controller';
import { HelloWorldClient } from '../../client/hello-world.client';
import { HelloWorldService } from '../../service/hello-world.service';
import {
  mockSuccess,
  mockError,
  createTestingModule,
} from '../../../../test/utils/test-util';
import { setHelloWorldMock } from '../../../../test/mocks/hello-wold/set-hello-world.mock';
import { getHelloWorldMock } from '../../../../test/mocks/hello-wold/get-hello-world.mock';

describe('HelloWorldController', () => {
  let service: HelloWorldService;
  let controller: HelloWorldController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [HelloWorldClient, HelloWorldService],
      controllers: [HelloWorldController],
    }).compile();

    service = module.get<HelloWorldService>(HelloWorldService);
    controller = module.get<HelloWorldController>(HelloWorldController);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('getHelloWorld - Pegar olá mundo', () => {
    test('Deve pegar olá mundo', (done) => {
      jest
        .spyOn(service, 'getHelloWorld')
        .mockReturnValue(mockSuccess(getHelloWorldMock));

      controller.getHelloWorld().subscribe((res) => {
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

      controller.getHelloWorld().subscribe({
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

      controller.setHelloWorld(setHelloWorldMock).subscribe((res) => {
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

      controller.setHelloWorld(setHelloWorldMock).subscribe({
        error: (err) => {
          expect(err().getStatus()).toEqual(HttpStatus.BAD_REQUEST);
          expect(err().message).toEqual('Error');
          done();
        },
      });
    });
  });
});
