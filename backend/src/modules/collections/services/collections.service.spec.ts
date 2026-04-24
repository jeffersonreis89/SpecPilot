import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollectionsService } from './collections.service';
import { Collection } from '../entities/collection.entity';

type MockCollectionRepository = {
  create: jest.Mock;
  save: jest.Mock;
  findOne: jest.Mock;
  find: jest.Mock;
  remove: jest.Mock;
};

describe('CollectionsService', () => {
  let service: CollectionsService;
  let repository: MockCollectionRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };

    service = new CollectionsService(
      repository as unknown as Repository<Collection>,
    );
  });

  it('creates a collection with the authenticated user id', async () => {
    const dto = {
      name: 'Minha collection',
      description: 'Teste simples',
      baseUrl: 'https://api.example.com',
      postmanData: { info: { name: 'Minha collection' } },
    };
    const createdCollection = { id: '1', ...dto, userId: 'user-123' };

    repository.create?.mockReturnValue(createdCollection);
    repository.save?.mockResolvedValue(createdCollection);

    const result = await service.create(dto, 'user-123');

    expect(repository.create).toHaveBeenCalledWith({
      ...dto,
      userId: 'user-123',
    });
    expect(repository.save).toHaveBeenCalledWith(createdCollection);
    expect(result).toEqual(createdCollection);
  });

  it('returns collections ordered by creation date for the user', async () => {
    const collections = [{ id: '1' }, { id: '2' }] as Collection[];

    repository.find?.mockResolvedValue(collections);

    const result = await service.findAll('user-123');

    expect(repository.find).toHaveBeenCalledWith({
      where: { userId: 'user-123' },
      order: { createdAt: 'DESC' },
    });
    expect(result).toEqual(collections);
  });

  it('throws when the collection is not found for the user', async () => {
    repository.findOne?.mockResolvedValue(null);

    await expect(service.findOne('collection-1', 'user-123')).rejects.toThrow(
      new NotFoundException('Collection not found'),
    );
  });
});
