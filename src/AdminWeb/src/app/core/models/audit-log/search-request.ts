import { DateRange } from "../../../components";
import { AdvancedSearchRequest } from "./advanced-search-request";
import { ApiSearchRequest } from "./api-search-request";
import { ExecutionSearchRequest } from "./execution-search-request";
import { MessageDeletedSearchRequest } from "./message-deleted-search-request";
import { TextSearchRequest } from "./text-search-request";
import { UserSearchRequest } from "./user-search-request";

export interface FormSearchRequest {
  guildId: string | null;
  userId: string | null;
  channelId: string | null;
  showTypes: number[];
  ignoreTypes: number[];
  created: DateRange | null;
  onlyWithFiles: boolean;
  ids: string | null;

  adv_info: TextSearchRequest | null;
  adv_warning: TextSearchRequest | null;
  adv_error: TextSearchRequest | null;
  adv_interaction: ExecutionSearchRequest | null;
  adv_jobs: ExecutionSearchRequest | null;
  adv_overwriteCreated: UserSearchRequest | null;
  adv_overwriteDeleted: UserSearchRequest | null;
  adv_overwriteUpdated: UserSearchRequest | null;
  adv_memberUpdated: UserSearchRequest | null;
  adv_memberRolesUpdated: UserSearchRequest | null;
  adv_api: ApiSearchRequest | null;
  adv_messageDeleted: MessageDeletedSearchRequest | null;
}

export interface SearchRequest {
  guildId: string | null;
  userIds: string[] | null;
  channelId: string | null;
  showTypes: number[];
  ignoreTypes: number[];
  createdFrom: string | null;
  createdTo: string | null;
  onlyWithFiles: boolean;
  ids: string[] | null;
  advancedSearch: AdvancedSearchRequest | null;
}
