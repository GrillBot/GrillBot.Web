import { Injectable } from "@angular/core";
import { BoardItem } from "../models/points/board-item";
import { BaseClient } from "./base.client";
import { TransactionItem } from "../models/points/transaction-item";
import { PaginatedResponse } from "../models/common";
import { AdminListRequest } from "../models/points/admin-list-request";
import { PointsChartItem } from "../models/points/points-chart-item";

@Injectable({ providedIn: 'root' })
export class PointsClient extends BaseClient {
  constructor() {
    super();
  }

  getLeaderboard = (guildId: string) => this.getRequest<BoardItem[]>(`service/Points/${guildId}/leaderboard`);
  getTransactionList = (request: any) => this.postRequest<PaginatedResponse<TransactionItem>>('service/Points/list', request);
  getChartData = (request: AdminListRequest) => this.postRequest<PointsChartItem[]>('service/Points/list/chart', request);
}
