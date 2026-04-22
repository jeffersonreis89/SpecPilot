import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
import { CreateCollectionDto, UpdateCollectionDto } from '../dto/collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async create(
    createCollectionDto: CreateCollectionDto,
    userId: string,
  ): Promise<Collection> {
    const collection = this.collectionRepository.create({
      ...createCollectionDto,
      userId,
    });

    return this.collectionRepository.save(collection);
  }

  async findAll(userId: string): Promise<Collection[]> {
    return this.collectionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { id, userId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
    userId: string,
  ): Promise<Collection> {
    const collection = await this.findOne(id, userId);

    Object.assign(collection, updateCollectionDto);

    return this.collectionRepository.save(collection);
  }

  async remove(id: string, userId: string): Promise<void> {
    const collection = await this.findOne(id, userId);
    await this.collectionRepository.remove(collection);
  }
}
