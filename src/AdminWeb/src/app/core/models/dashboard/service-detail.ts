import { OperationStatItem } from "./operation-stat-item";
import { RequestStatistics } from "./request-statistics";

export interface ServiceDetail {
  name: string;
  url: string;
  apiErrorMessage?: string;
  usedMemory: number;
  uptime: number;
  cpuTime: number;
  requestsCount: number;
  measuredFrom: string;
  endpoints: RequestStatistics[];
  databaseStatistics?: { [k: string]: number };
  operations: OperationStatItem[];
  additionalData: { [k: string]: string };
}
