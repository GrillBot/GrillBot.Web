import { ApiSearchRequest } from "./api-search-request";
import { ExecutionSearchRequest } from "./execution-search-request";
import { MessageDeletedSearchRequest } from "./message-deleted-search-request";
import { TextSearchRequest } from "./text-search-request";
import { UserSearchRequest } from "./user-search-request";

export interface AdvancedSearchRequest {
  info: TextSearchRequest | null;
  warning: TextSearchRequest | null;
  error: TextSearchRequest | null;
  interaction: ExecutionSearchRequest | null;
  job: ExecutionSearchRequest | null;
  api: ApiSearchRequest | null;
  overwriteCreated: UserSearchRequest | null;
  overwriteDeleted: UserSearchRequest | null;
  overwriteUpdated: UserSearchRequest | null;
  memberRolesUpdated: UserSearchRequest | null;
  memberUpdated: UserSearchRequest | null;
  messageDeleted: MessageDeletedSearchRequest | null;
}
