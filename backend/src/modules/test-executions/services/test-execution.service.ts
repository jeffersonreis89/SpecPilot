import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosError } from 'axios';
import { TestResult } from '../entities/test-result.entity';
import { Collection } from '../../collections/entities/collection.entity';
import { ExecuteTestDto } from '../dto/test-execution.dto';

@Injectable()
export class TestExecutionService {
  constructor(
    @InjectRepository(TestResult)
    private testResultRepository: Repository<TestResult>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async executeTests(
    executeTestDto: ExecuteTestDto,
    userId: string,
  ): Promise<TestResult[]> {
    const collection = await this.collectionRepository.findOne({
      where: { id: executeTestDto.collectionId, userId },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    const postmanCollection = collection.postmanData;

    if (!postmanCollection || !postmanCollection.item) {
      throw new BadRequestException('Invalid Postman collection format');
    }

    const results: TestResult[] = [];
    const baseUrl = collection.baseUrl || this.extractBaseUrl(postmanCollection);
    const variables = this.buildVariableMap(postmanCollection, baseUrl);

    // Iterate through requests
    for (const item of postmanCollection.item) {
      const testResult = await this.executeRequest(
        item,
        baseUrl,
        variables,
        collection.id,
        userId,
      );
      results.push(testResult);
    }

    return results;
  }

  private async executeRequest(
    item: any,
    baseUrl: string,
    variables: Record<string, string>,
    collectionId: string,
    userId: string,
  ): Promise<TestResult> {
    try {
      const request = item.request;
      const method = request.method || 'GET';
      const url = this.parseUrl(request.url, baseUrl, variables);

      const startTime = Date.now();

      const response = await axios({
        method,
        url,
        headers: request.header ? this.parseHeaders(request.header, variables) : {},
        data: request.body?.raw ? this.resolveVariables(request.body.raw, variables) : undefined,
        validateStatus: () => true, // Don't throw on any status
      });

      const duration = Date.now() - startTime;
      const status = response.status >= 200 && response.status < 300 ? 'passed' : 'failed';

      const testResult = this.testResultRepository.create({
        requestName: item.name,
        method,
        url,
        statusCode: response.status,
        status,
        responseBody: response.data,
        duration,
        collectionId,
        userId,
      });

      return this.testResultRepository.save(testResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      const testResult = this.testResultRepository.create({
        requestName: item.name,
        method: item.request.method || 'GET',
        url: this.parseUrl(item.request.url, baseUrl, variables),
        statusCode: 0,
        status: 'error',
        errorMessage,
        collectionId,
        userId,
      });

      return this.testResultRepository.save(testResult);
    }
  }

  private parseUrl(
    url: string | any,
    baseUrl: string,
    variables: Record<string, string>,
  ): string {
    if (typeof url === 'string') {
      const resolvedUrl = this.resolveVariables(url, variables);
      return resolvedUrl.startsWith('http') ? resolvedUrl : `${baseUrl}${resolvedUrl}`;
    }

    if (url.raw) {
      const resolvedRawUrl = this.resolveVariables(url.raw, variables);
      return resolvedRawUrl.startsWith('http')
        ? resolvedRawUrl
        : `${baseUrl}${resolvedRawUrl}`;
    }

    return baseUrl;
  }

  private parseHeaders(
    headers: any[],
    variables: Record<string, string>,
  ): Record<string, string> {
    const result: Record<string, string> = {};
    for (const header of headers) {
      result[header.key] = this.resolveVariables(header.value, variables);
    }
    return result;
  }

  private buildVariableMap(collection: any, baseUrl: string): Record<string, string> {
    const variables: Record<string, string> = {
      baseUrl,
    };

    if (collection.variable) {
      for (const variable of collection.variable) {
        if (variable.key && typeof variable.value === 'string') {
          variables[variable.key] = variable.value;
        }
      }
    }

    return variables;
  }

  private resolveVariables(value: string, variables: Record<string, string>): string {
    if (!value) {
      return value;
    }

    return value.replace(/\{\{([^}]+)\}\}/g, (_, variableName: string) => {
      const trimmedName = variableName.trim();
      return variables[trimmedName] ?? `{{${trimmedName}}}`;
    });
  }

  private extractBaseUrl(collection: any): string {
    // Try to extract from variables or request URLs
    if (collection.variable) {
      for (const variable of collection.variable) {
        if (variable.key === 'baseUrl' || variable.key === 'BASE_URL') {
          return variable.value;
        }
      }
    }

    return 'http://localhost:3001';
  }

  async getHistory(
    collectionId: string,
    userId: string,
  ): Promise<TestResult[]> {
    return this.testResultRepository.find({
      where: { collectionId, userId },
      order: { executedAt: 'DESC' },
      take: 100,
    });
  }

  async getHistoryStats(
    collectionId: string,
    userId: string,
  ): Promise<{
    total: number;
    passed: number;
    failed: number;
    error: number;
  }> {
    const results = await this.testResultRepository.find({
      where: { collectionId, userId },
    });

    return {
      total: results.length,
      passed: results.filter((r) => r.status === 'passed').length,
      failed: results.filter((r) => r.status === 'failed').length,
      error: results.filter((r) => r.status === 'error').length,
    };
  }
}
