export class ExecuteTestDto {
  collectionId: string;
  requestName?: string; // Optional: if not provided, execute all
}

export class TestResultResponseDto {
  id: string;
  requestName: string;
  method: string;
  url: string;
  statusCode: number;
  status: 'passed' | 'failed' | 'error';
  duration?: number;
  errorMessage?: string;
  executedAt: Date;
}

export class TestResultsHistoryDto {
  total: number;
  passed: number;
  failed: number;
  error: number;
  results: TestResultResponseDto[];
}
