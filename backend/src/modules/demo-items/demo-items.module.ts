import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoItem } from './entities/demo-item.entity';
import { DemoItemsController } from './controllers/demo-items.controller';
import { DemoItemsService } from './services/demo-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemoItem])],
  controllers: [DemoItemsController],
  providers: [DemoItemsService],
})
export class DemoItemsModule {}
