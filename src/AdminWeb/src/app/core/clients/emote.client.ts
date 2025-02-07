import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { EmoteStatisticsListRequest } from "../models/emote/emote-statistics-list-request";
import { EmoteStatisticsItem } from "../models/emote/emote-statistics-item";
import { EmoteInfo } from "../models/emote/emote-info";
import { MergeStatisticsResult } from "../models/emote/merge-statistics-result";
import { EmoteUserUsageListRequest } from "../models/emote/emote-user-usage-list-request";
import { EmoteUserUsageItem } from "../models/emote/emote-user-usage-item";
import { EmoteDefinition } from "../models/emote/emote-definition";

@Injectable({ providedIn: 'root' })
export class EmoteClient extends BaseClient {
  constructor() {
    super();
  }

  getEmoteStatisticsList = (request: WithSortAndPagination<EmoteStatisticsListRequest>) =>
    this.postRequest<PaginatedResponse<EmoteStatisticsItem>>('service/Emote/statistics-list', request);

  getEmoteInfo = (guildId: string, emoteId: string) =>
    this.getRequest<EmoteInfo>(`service/Emote/${guildId}/${emoteId}`);

  mergeStatistics = (guildId: string, sourceEmoteId: string, destinationEmoteId: string) =>
    this.putRequest<MergeStatisticsResult>(`service/Emote/merge/${guildId}/${sourceEmoteId}/${destinationEmoteId}`, null);

  getUserEmoteUsageList = (request: WithSortAndPagination<EmoteUserUsageListRequest>) =>
    this.postRequest<PaginatedResponse<EmoteUserUsageItem>>(`service/Emote/usage-list`, request);

  getSupportedEmotesList = (guildId: string | null) =>
    this.getRequest<EmoteDefinition[]>(`service/Emote/supported-emotes`, guildId ? { guildId } : undefined);

  deleteSupportedEmote = (guildId: string, emoteId: string) =>
    this.deleteRequest(`service/Emote/supported-emotes/${guildId}/${emoteId}`);

  deleteStatistics = (guildId: string, emoteId: string, userId: string | null) =>
    this.deleteRequest(`service/Emote/${guildId}/${emoteId}`, userId ? { userId } : undefined);
}
