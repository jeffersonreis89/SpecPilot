import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { Collection } from '../collections/entities/collection.entity';
import { TestExecutionService } from './services/test-execution.service';
import { TestExecutionsController } from './controllers/test-executions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult, Collection])],
  providers: [TestExecutionService],
  controllers: [TestExecutionsController],
  exports: [TestExecutionService],
})
export class TestExecutionsModule {}
