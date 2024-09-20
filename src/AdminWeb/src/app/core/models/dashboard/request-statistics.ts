export interface RequestStatistics {
  endpoint: string;
  lastRequestAt: string;
  totalTime: number;
  lastTime: number;
  successCount: number;
  failedCount: number;
  count: number;
  avgTime: number;
  successRate: number;
}
