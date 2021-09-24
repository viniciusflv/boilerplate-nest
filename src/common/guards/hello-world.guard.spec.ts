import { HelloWorldGuard } from './hello-world.guard';

describe('HelloWorldGuard', () => {
  let helloWorldGuard: HelloWorldGuard;

  beforeAll(() => {
    helloWorldGuard = new HelloWorldGuard();
  });

  it('Deve estar definido', () => {
    expect(helloWorldGuard).toBeDefined();
  });

  test('Deve bloquear tokens inválidos', () => {
    const ctx: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: '456' },
        }),
      }),
    };

    const res = helloWorldGuard.canActivate(ctx);

    expect(res).toBeFalsy();
  });

  test('Deve aceitar tokens válidos', () => {
    const ctx: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: 'Bearer 123' },
        }),
      }),
    };

    const res = helloWorldGuard.canActivate(ctx);

    expect(res).toBeTruthy();
  });
});
