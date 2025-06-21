import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { AutoReplyDefinition, AutoReplyDefinitionListRequest, AutoReplyDefinitionRequest } from "../models/message";

@Injectable({ providedIn: 'root' })
export class MessageClient extends BaseClient {
  createAutoReplyDefinition = (request: AutoReplyDefinitionRequest) =>
    this.postRequest<AutoReplyDefinition>('service/message/autoreply', request);

  getAutoReplyDefinition = (id: string) =>
    this.getRequest<AutoReplyDefinition>(`service/message/autoreply/${id}`);

  getAutoReplyDefinitionList = (request: WithSortAndPagination<AutoReplyDefinitionListRequest>) =>
    this.postRequest<PaginatedResponse<AutoReplyDefinition>>('service/message/autoreply/list', request);

  deleteAutoReplyDefinition = (id: string) =>
    this.deleteRequest(`service/message/autoreply/${id}`);

  updateAutoReplyDefinition = (id: string, request: AutoReplyDefinitionRequest) =>
    this.putRequest<AutoReplyDefinition>(`service/message/autoreply/${id}`, request);
}
