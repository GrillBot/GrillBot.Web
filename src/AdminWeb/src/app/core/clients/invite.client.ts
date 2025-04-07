import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { Invite, InviteListRequest, InviteUse, InviteUseListRequest, UserInviteUseListRequest } from "../models/invite";

@Injectable({ providedIn: 'root' })
export class InviteClient extends BaseClient {
  getCachedInvites = (request: WithSortAndPagination<InviteListRequest>) =>
    this.postRequest<PaginatedResponse<Invite>>('service/invite/cached-invites/list', request);

  getUsedInvites = (request: WithSortAndPagination<InviteListRequest>) =>
    this.postRequest<PaginatedResponse<Invite>>('service/invite/used-invites/list', request);

  getInviteUses = (request: WithSortAndPagination<InviteUseListRequest>) =>
    this.postRequest<PaginatedResponse<InviteUse>>('service/invite/invite-uses/list', request);

  getUserInviteUses = (request: WithSortAndPagination<UserInviteUseListRequest>) =>
    this.postRequest<PaginatedResponse<InviteUse>>('service/invite/user-invite-uses/list', request);

  synchronizeGuildInvites = (guildId: string) =>
    this.postRequest<void>(`service/invite/synchronize/${guildId}`, null);
}
