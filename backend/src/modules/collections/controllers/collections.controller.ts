import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CollectionsService } from '../services/collections.service';
import { CreateCollectionDto, UpdateCollectionDto, CollectionResponseDto } from '../dto/collection.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../../common/types/authenticated-request.type';

@ApiTags('collections')
@Controller('api/collections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post()
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<CollectionResponseDto> {
    const collection = await this.collectionsService.create(
      createCollectionDto,
      req.user.id,
    );

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      baseUrl: collection.baseUrl,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const collections = await this.collectionsService.findAll(req.user.id);

    return collections.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      baseUrl: c.baseUrl,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const collection = await this.collectionsService.findOne(id, req.user.id);

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      baseUrl: collection.baseUrl,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<CollectionResponseDto> {
    const collection = await this.collectionsService.update(
      id,
      updateCollectionDto,
      req.user.id,
    );

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      baseUrl: collection.baseUrl,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: AuthenticatedRequest): Promise<void> {
    await this.collectionsService.remove(id, req.user.id);
  }
}
