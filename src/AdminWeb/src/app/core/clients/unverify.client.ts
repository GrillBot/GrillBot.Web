import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { GuildInfo } from "../models/unverify/guild-info";
import { ModifyGuildRequest } from "../models/unverify/modify-guild-request";
import { CreateKeepableRequest } from "../models/unverify/create-keepable-request";
import { LocalizedMessageContent, PaginatedResponse, WithSortAndPagination } from "../models/common";
import { KeepablesListRequest } from "../models/unverify/keepables-list-request";
import { KeepableListItem } from "../models/unverify/keepable-list-item";
import { UnverifyLogListRequest } from "../models/unverify/unverify-log-list-request";
import { UnverifyLogItem } from "../models/unverify/unverify-log-item";
import { UnverifyLogDetail } from "../models/unverify/unverify-log-detail";
import { ActiveUnverifyListRequest } from "../models/unverify/active-unverify-list-request";
import { ActiveUnverifyListItemResponse } from "../models/unverify/active-unverify-list-item-response";
import { UpdateUnverifyRequest } from "../models/unverify/update-unverify-request";
import { ModifyUserRequest } from "../models/unverify/modify-user-request";

@Injectable({ providedIn: 'root' })
export class UnverifyClient extends BaseClient {
  getGuildInfo = (guildId: string) =>
    this.getRequest<GuildInfo>(`service/unverify/guild/${guildId}`);

  modifyGuild = (guildId: string, request: ModifyGuildRequest) =>
    this.putRequest<GuildInfo>(`service/unverify/guild/${guildId}`, request);

  createKeepables = (requests: CreateKeepableRequest[]) =>
    this.postRequest(`service/unverify/keepables`, requests);

  getKeepablesList = (request: WithSortAndPagination<KeepablesListRequest>) =>
    this.postRequest<PaginatedResponse<KeepableListItem>>('service/unverify/keepables/list', request);

  deleteKeepables = (group: string, name?: string) =>
    this.deleteRequest(`service/keepables/${group}`, name ? { name } : undefined);

  getUnverifyLogs = (request: WithSortAndPagination<UnverifyLogListRequest>) =>
    this.postRequest<PaginatedResponse<UnverifyLogItem>>('service/unverify/logs/list', request);

  getUnverifyLogDetail = (id: string) =>
    this.getRequest<UnverifyLogDetail>(`service/unverify/logs/${id}`);

  getPeriodStatistics = (groupingKey: string, operationType: number) =>
    this.getRequest<{ [key: string]: number }>('service/unverify/statistics/periodstats', { groupingKey, operationType: new String(operationType).toString() });

  getActiveUnverifyList = (request: WithSortAndPagination<ActiveUnverifyListRequest>) =>
    this.postRequest<PaginatedResponse<ActiveUnverifyListItemResponse>>('service/unverify/unverify/list', request);

  removeUnverify = (guildId: string, userId: string, isForceRemove: boolean) =>
    this.deleteRequest(`service/unverify/unverify/${guildId}/${userId}`, { isForceRemove: isForceRemove ? 'true' : 'false' });

  updateUnverify = (request: UpdateUnverifyRequest) =>
    this.putRequest<LocalizedMessageContent>(`service/unverify/unverify`, request);

  modifyUser = (userId: string, request: ModifyUserRequest) =>
    this.putRequest(`service/unverify/unverify/${userId}`, request);

  getUserInfo = (userId: string) =>
    this.getRequest<ModifyUserRequest>(`service/unverify/${userId}`);
}
