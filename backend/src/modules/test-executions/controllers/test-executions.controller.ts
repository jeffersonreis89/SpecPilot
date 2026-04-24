import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TestExecutionService } from '../services/test-execution.service';
import {
  ExecuteTestDto,
  TestResultResponseDto,
} from '../dto/test-execution.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../../common/types/authenticated-request.type';

@ApiTags('test-executions')
@Controller('api/test-executions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TestExecutionsController {
  constructor(private testExecutionService: TestExecutionService) {}

  @Post('execute')
  async executeTests(
    @Body() executeTestDto: ExecuteTestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<TestResultResponseDto[]> {
    const results = await this.testExecutionService.executeTests(
      executeTestDto,
      req.user.id,
    );

    return results.map((r) => ({
      id: r.id,
      requestName: r.requestName,
      method: r.method,
      url: r.url,
      statusCode: r.statusCode,
      status: r.status,
      duration: r.duration,
      errorMessage: r.errorMessage,
      executedAt: r.executedAt,
    }));
  }

  @Get('history/:collectionId')
  async getHistory(
    @Param('collectionId') collectionId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<TestResultResponseDto[]> {
    const results = await this.testExecutionService.getHistory(
      collectionId,
      req.user.id,
    );

    return results.map((r) => ({
      id: r.id,
      requestName: r.requestName,
      method: r.method,
      url: r.url,
      statusCode: r.statusCode,
      status: r.status,
      duration: r.duration,
      errorMessage: r.errorMessage,
      executedAt: r.executedAt,
    }));
  }

  @Get('stats/:collectionId')
  async getStats(
    @Param('collectionId') collectionId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<{ total: number; passed: number; failed: number; error: number }> {
    return this.testExecutionService.getHistoryStats(collectionId, req.user.id);
  }
}
