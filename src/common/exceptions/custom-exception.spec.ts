import { HttpStatus } from '@nestjs/common';

import { CustomException } from './custom-exception';

describe('CustomException', () => {
  it('should be defined', () => {
    expect(
      new CustomException('Ops deu xabu', HttpStatus.BAD_REQUEST, 'ERR-001'),
    ).toBeDefined();
  });
});
