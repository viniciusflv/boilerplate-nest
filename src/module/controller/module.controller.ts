import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { ModuleService } from '../service/module.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModuleRequestDTO, ModuleResponseDTO } from './module.controller.dto';

@Controller('module')
@ApiTags('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create',
    description: 'The C from CRUD',
  })
  @ApiOkResponse({
    type: ModuleResponseDTO,
    description: 'Response',
  })
  public create(@Body() data: ModuleRequestDTO) {
    return this.moduleService.create(data);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Read',
    description: 'The R from CRUD',
  })
  @ApiOkResponse({
    type: ModuleResponseDTO,
    description: 'Response',
  })
  public read(@Param('id') slug: string) {
    return this.moduleService.read(slug);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update',
    description: 'The U from CRUD',
  })
  @ApiOkResponse({
    type: ModuleResponseDTO,
    description: 'Response',
  })
  public update(@Param('id') slug: string, @Body() data: ModuleRequestDTO) {
    return this.moduleService.update(slug, data);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete',
    description: 'The D from CRUD',
  })
  @ApiOkResponse({
    type: ModuleResponseDTO,
    description: 'Response',
  })
  public delete(@Param('id') slug: string) {
    return this.moduleService.delete(slug);
  }

  @Get('/scan')
  @ApiOperation({
    summary: 'Scan',
    description: 'Return all',
  })
  @ApiOkResponse({
    type: ModuleResponseDTO,
    description: 'Response',
  })
  public scan() {
    return this.moduleService.scan();
  }
}
