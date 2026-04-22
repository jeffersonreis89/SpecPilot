import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemoItem } from '../entities/demo-item.entity';
import { CreateDemoItemDto, UpdateDemoItemDto } from '../dto/demo-item.dto';

@Injectable()
export class DemoItemsService {
  constructor(
    @InjectRepository(DemoItem)
    private readonly demoItemRepository: Repository<DemoItem>,
  ) {}

  async create(createDemoItemDto: CreateDemoItemDto): Promise<DemoItem> {
    const item = this.demoItemRepository.create({
      ...createDemoItemDto,
      completed: createDemoItemDto.completed ?? false,
    });

    return this.demoItemRepository.save(item);
  }

  async findAll(): Promise<DemoItem[]> {
    return this.demoItemRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<DemoItem> {
    const item = await this.demoItemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('Demo item not found');
    }

    return item;
  }

  async update(id: string, updateDemoItemDto: UpdateDemoItemDto): Promise<DemoItem> {
    const item = await this.findOne(id);

    Object.assign(item, updateDemoItemDto);

    return this.demoItemRepository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.demoItemRepository.remove(item);
  }
}
