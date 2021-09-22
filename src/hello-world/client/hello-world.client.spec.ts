import { TestingModule } from '@nestjs/testing';

import { HelloWorldClient } from './hello-world.client';
import { createTestingModule } from '../../../test/utils/test-util';

describe('HelloWorldClient - Cliente olá mundo', () => {
  let client: HelloWorldClient;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [HelloWorldClient],
    }).compile();

    client = module.get<HelloWorldClient>(HelloWorldClient);
  });

  it('Deve estar definido', () => {
    expect(client).toBeDefined();
  });

  describe('getHelloWorld - Pegar olá mundo', () => {
    test('Deve pegar olá mundo', (done) => {
      client.getHelloWorld().subscribe((res) => {
        expect(res).toMatchInlineSnapshot(`
          Object {
            "helloWorld": "Olá mundo!",
          }
        `);
        done();
      });
    });
  });

  describe('setHelloWorld - Atualizar olá mundo', () => {
    test('Deve pegar olá mundo', (done) => {
      client
        .setHelloWorld({
          helloWorld: 'Hello world!',
        })
        .subscribe((res) => {
          expect(res).toMatchInlineSnapshot(`
            Object {
              "helloWorld": "Hello world!",
            }
          `);
          done();
        });
    });
  });
});
