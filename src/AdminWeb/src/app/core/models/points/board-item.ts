import { PointsStatus } from "./points-status";

export interface BoardItem extends PointsStatus {
  userId: string;
}
