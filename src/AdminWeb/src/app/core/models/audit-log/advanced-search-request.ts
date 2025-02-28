import { ApiSearchRequest } from "./api-search-request";
import { ExecutionSearchRequest } from "./execution-search-request";
import { MessageDeletedSearchRequest } from "./message-deleted-search-request";
import { TextSearchRequest } from "./text-search-request";
import { UserIdSearchRequest } from "./user-id-search-request";

export interface AdvancedSearchRequest {
  info: TextSearchRequest | null;
  warning: TextSearchRequest | null;
  error: TextSearchRequest | null;
  interaction: ExecutionSearchRequest | null;
  job: ExecutionSearchRequest | null;
  api: ApiSearchRequest | null;
  overwriteCreated: UserIdSearchRequest | null;
  overwriteDeleted: UserIdSearchRequest | null;
  overwriteUpdated: UserIdSearchRequest | null;
  memberRolesUpdated: UserIdSearchRequest | null;
  memberUpdated: UserIdSearchRequest | null;
  messageDeleted: MessageDeletedSearchRequest | null;
  memberWarning: UserIdSearchRequest | null;
}
