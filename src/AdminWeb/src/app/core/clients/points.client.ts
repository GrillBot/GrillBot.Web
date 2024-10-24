import { Injectable } from "@angular/core";
import { BoardItem } from "../models/points/board-item";
import { BaseClient } from "./base.client";
import { TransactionItem } from "../models/points/transaction-item";
import { PaginatedResponse, PaginatedType, WithSortAndPagination } from "../models/common";
import { AdminListRequest } from "../models/points/admin-list-request";
import { PointsChartItem } from "../models/points/points-chart-item";
import { UserListItem } from "../models/points/user-list-item";
import { UserListRequest } from "../models/points/user-list-request";

@Injectable({ providedIn: 'root' })
export class PointsClient extends BaseClient {
  constructor() {
    super();
  }

  getLeaderboard = (guildId: string) => this.getRequest<BoardItem[]>(`service/Points/${guildId}/leaderboard`);

  getTransactionList = (request: WithSortAndPagination<AdminListRequest>) =>
    this.postRequest<PaginatedResponse<TransactionItem>>('service/Points/list', request);

  getChartData = (request: AdminListRequest) =>
    this.postRequest<PointsChartItem[]>('service/Points/list/chart', request);

  getUserList = (request: PaginatedType<UserListRequest>) =>
    this.postRequest<PaginatedResponse<UserListItem>>('service/Points/list/users', request);

  deleteTransaction = (guildId: string, messageId: string, reactionId?: string) => {
    if (reactionId) {
      return this.deleteRequest(`service/Points/${guildId}/${messageId}`, { reactionId: reactionId });
    } else {
      return this.deleteRequest(`service/Points/${guildId}/${messageId}`);
    }
  }
}
