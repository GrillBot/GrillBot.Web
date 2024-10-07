import { Injectable } from "@angular/core";
import { BoardItem } from "../models/points/board-item";
import { BaseClient } from "./base.client";

@Injectable({ providedIn: 'root' })
export class PointsClient extends BaseClient {
  constructor() {
    super();
  }

  getLeaderboard = (guildId: string) => this.getRequest<BoardItem[]>(`service/Points/${guildId}/leaderboard`);
}
