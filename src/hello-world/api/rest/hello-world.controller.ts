import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { HelloWorldRequestDTO } from './request/hello-world.dto';
import { HelloWorldResponseDTO } from './response/hello-world.dto';
import { Logger } from '../../../common/decorators/logger.decorator';
import { HelloWorldService } from '../../service/hello-world.service';
import { HelloWorldDecorator } from '../../../common/decorators/hello-world.decorator';

@Controller('hello-world')
@ApiTags('hello-world')
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get('/')
  @HelloWorldDecorator()
  @Logger(HelloWorldController.name, 'pegar o olá mundo')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Pega o olá mundo',
    description: 'Pega o olá mundo',
  })
  @ApiOkResponse({
    type: HelloWorldResponseDTO,
    description: 'Pega o olá mundo',
  })
  getHelloWorld() {
    return this.helloWorldService.getHelloWorld();
  }

  @Put('/')
  @HelloWorldDecorator()
  @Logger(HelloWorldController.name, 'atualizar o olá mundo')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualiza o olá mundo',
    description: 'Atualiza o olá mundo',
  })
  @ApiOkResponse({
    type: HelloWorldResponseDTO,
    description: 'Atualiza o olá mundo',
  })
  setHelloWorld(@Body() payload: HelloWorldRequestDTO) {
    return this.helloWorldService.setHelloWorld(payload);
  }

  @Put('/:message')
  @HelloWorldDecorator()
  @Logger(HelloWorldController.name, 'pegar o olá mundo')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    required: true,
    description: 'Canal de origem da requisição.',
  })
  @ApiOperation({
    summary: 'Atualiza o olá mundo',
    description: 'Atualiza o olá mundo',
  })
  @ApiOkResponse({
    type: HelloWorldResponseDTO,
    description: 'Atualiza o olá mundo',
  })
  setHelloWorldByParam(
    @Param('message') message: string,
    @Query('user') user: string,
  ) {
    return this.helloWorldService.setHelloWorld({
      helloWorld: `${message} ${user}`,
    });
  }
}
