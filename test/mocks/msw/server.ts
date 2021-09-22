import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { HttpStatus } from '@nestjs/common';

import { getHelloWorldMock } from '../hello-wold/get-hello-world.mock';

export const server = setupServer(
  rest.get(`http://api.false/hello-world`, (req, res, ctx) => {
    return res(ctx.status(HttpStatus.OK), ctx.json(getHelloWorldMock));
  }),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: jest.fn(),
  });
});

afterAll(() => {
  server.close();
});
