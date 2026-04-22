import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateDemoItemDto,
  DemoItemResponseDto,
  UpdateDemoItemDto,
} from '../dto/demo-item.dto';
import { DemoItemsService } from '../services/demo-items.service';

@ApiTags('demo-items')
@Controller('api/demo-items')
export class DemoItemsController {
  constructor(private readonly demoItemsService: DemoItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um item de exemplo' })
  @ApiCreatedResponse({
    description: 'Item criado com sucesso.',
    type: DemoItemResponseDto,
  })
  async create(@Body() createDemoItemDto: CreateDemoItemDto): Promise<DemoItemResponseDto> {
    return this.demoItemsService.create(createDemoItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens de exemplo' })
  @ApiOkResponse({
    description: 'Lista de itens de exemplo.',
    type: DemoItemResponseDto,
    isArray: true,
  })
  async findAll(): Promise<DemoItemResponseDto[]> {
    return this.demoItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um item de exemplo por id' })
  @ApiOkResponse({
    description: 'Item encontrado.',
    type: DemoItemResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Item nao encontrado.' })
  async findOne(@Param('id') id: string): Promise<DemoItemResponseDto> {
    return this.demoItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um item de exemplo' })
  @ApiOkResponse({
    description: 'Item atualizado com sucesso.',
    type: DemoItemResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Item nao encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateDemoItemDto: UpdateDemoItemDto,
  ): Promise<DemoItemResponseDto> {
    return this.demoItemsService.update(id, updateDemoItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um item de exemplo' })
  @ApiNoContentResponse({ description: 'Item removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Item nao encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.demoItemsService.remove(id);
  }
}
