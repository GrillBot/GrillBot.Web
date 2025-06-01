import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import {
  EmoteDefinition, EmoteInfo, EmoteStatisticsItem, EmoteStatisticsListRequest, EmoteSuggestionItem, EmoteSuggestionsListRequest,
  EmoteSuggestionVoteItem, EmoteSuggestionVoteListRequest, EmoteUserUsageItem, EmoteUserUsageListRequest, MergeStatisticsResult
} from "../models/emote";

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

  getEmoteSuggestionsList = (request: WithSortAndPagination<EmoteSuggestionsListRequest>) =>
    this.postRequest<PaginatedResponse<EmoteSuggestionItem>>(`service/Emote/emote-suggestions/list`, request);

  setSuggestionApproval = (suggestionId: string, isApproved: boolean) =>
    this.putRequest(`service/Emote/emote-suggestions/approve/${suggestionId}`, null, { isApproved: isApproved ? 'true' : 'false' });

  getEmoteSuggestionVotes = (suggestionId: string, request: WithSortAndPagination<EmoteSuggestionVoteListRequest>) =>
    this.postRequest<PaginatedResponse<EmoteSuggestionVoteItem>>(`service/Emote/emote-suggestions/${suggestionId}/votes`, request);

  emoteSuggestionsCancelVote = (suggestionId: string) =>
    this.deleteRequest(`service/Emote/emote-suggestions/${suggestionId}/votes`);

  getEmoteSuggestionImagePreview = (suggestionId: string) =>
    this.getFile(`service/Emote/emote-suggestions/${suggestionId}/preview`);
}
