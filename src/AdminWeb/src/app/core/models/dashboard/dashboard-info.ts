import { ConnectionState } from "../../enums/connection-state";

export interface DashboardInfo {
  isDevelopment: boolean;
  startAt: string;
  uptime: number;
  cpuTime: number;
  connectionState: ConnectionState;
  usedMemory: number;
  isActive: boolean;
  currentDateTime: string;
  services: string[];
}
