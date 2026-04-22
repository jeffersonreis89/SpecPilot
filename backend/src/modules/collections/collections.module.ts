import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './controllers/collections.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  providers: [CollectionsService],
  controllers: [CollectionsController],
  exports: [CollectionsService],
})
export class CollectionsModule {}
