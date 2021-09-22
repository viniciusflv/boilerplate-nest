import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { AppModule } from '../../../src/app.module';
import { loggerMock } from '../../utils/logger-mock';

const getHelloWorld = loadFeature(
  `${__dirname}/features/get-hello-world.feature`,
);
const setHelloWorld = loadFeature(
  `${__dirname}/features/set-hello-world.feature`,
);
const queryHelloWorld = loadFeature(
  `${__dirname}/features/query-hello-world.feature`,
);
const mutationHelloWorld = loadFeature(
  `${__dirname}/features/mutation-hello-world.feature`,
);

describe('HelloWorld - API de olá mundo', () => {
  let app: INestApplication;
  let response: request.Response;
  let payload: Record<string, string | number>;

  beforeEach(() => {
    payload = {};
    response = undefined;
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useLogger(loggerMock);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  defineFeature(getHelloWorld, (test) => {
    test('Deve pegar o olá mundo', ({ given, when, then }) => {
      given(/^a mensagem "(.*)"$/, (message) => {
        payload.helloWorld = message;
      });

      when(/^chamar o endpoint "(.*)"$/, async (endpoint) => {
        response = await request(app.getHttpServer()).get(endpoint).set({
          token: '123',
        });
      });

      then(/^deve retornar sucesso com status "(.*)"$/, (status) => {
        expect(response.status).toEqual(Number(status));
        expect(response.body).toStrictEqual(payload);
      });
    });
  });

  defineFeature(queryHelloWorld, (test) => {
    test('Deve pegar o olá mundo', ({ given, when, then }) => {
      given(/^a mensagem "(.*)"$/, (message) => {
        payload.helloWorld = message;
      });

      when(
        /^chamar o endpoint "(.*)" com a query$/,
        async (endpoint, query) => {
          response = await request(app.getHttpServer())
            .post(endpoint)
            .set({
              token: '123',
            })
            .send({
              operationName: null,
              variables: {},
              query,
            });
        },
      );

      then(/^deve retornar sucesso com status "(.*)"$/, (status) => {
        expect(response.status).toEqual(Number(status));
        expect(response.body).toStrictEqual({ data: { helloWorld: payload } });
      });
    });
  });

  defineFeature(setHelloWorld, (test) => {
    test('Deve atualizar o olá mundo', ({ given, when, then }) => {
      given(/^a mensagem "(.*)"$/, (message) => {
        payload.helloWorld = message;
      });

      when(/^chamar o endpoint "(.*)"$/, async (endpoint) => {
        response = await request(app.getHttpServer())
          .put(endpoint)
          .set({
            token: '123',
          })
          .send(payload);
      });

      then(/^deve retornar sucesso com status "(.*)"$/, (status) => {
        expect(response.status).toEqual(Number(status));
        expect(response.body).toStrictEqual(payload);
      });
    });
  });

  defineFeature(mutationHelloWorld, (test) => {
    test('Deve atualizar o olá mundo', ({ given, when, then }) => {
      given(/^a mensagem "(.*)"$/, (message) => {
        payload.helloWorld = message;
      });

      when(
        /^chamar o endpoint "(.*)" com a query$/,
        async (endpoint, query) => {
          response = await request(app.getHttpServer())
            .post(endpoint)
            .set({
              token: '123',
            })
            .send({
              operationName: null,
              variables: { message: payload.helloWorld },
              query,
            });
        },
      );

      then(/^deve retornar sucesso com status "(.*)"$/, (status) => {
        expect(response.status).toEqual(Number(status));
        expect(response.body).toStrictEqual({
          data: { setHelloWorld: payload },
        });
      });
    });
  });
});
