import { CounterStats } from "./counter-stats";

export interface OperationStatItem extends CounterStats {
  childItems: OperationStatItem[];
}
