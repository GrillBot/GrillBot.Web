import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { SearchingListRequest } from "../models/searching/searching-list-request";
import { SearchListItem } from "../models/searching/search-list-item";

@Injectable({ providedIn: 'root' })
export class SearchingClient extends BaseClient {
  getSearchingList = (request: WithSortAndPagination<SearchingListRequest>) =>
    this.postRequest<PaginatedResponse<SearchListItem>>('service/Searching/list', request);

  removeSearching = (id: number) => this.deleteRequest(`service/Searching/${id}`);
}
