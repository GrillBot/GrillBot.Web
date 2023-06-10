import {
    ApiSearchRequest, ExecutionSearchRequest, MessageDeletedSearchRequest, TextSearchRequest, UserIdSearchRequest
} from 'src/app/core/models/audit-log';

export interface ExtendedFilterData {
    info: TextSearchRequest;
    warning: TextSearchRequest;
    error: TextSearchRequest;
    interaction: ExecutionSearchRequest;
    job: ExecutionSearchRequest;
    api: ApiSearchRequest;
    overwriteCreated: UserIdSearchRequest;
    overwriteDeleted: UserIdSearchRequest;
    overwriteUpdated: UserIdSearchRequest;
    memberUpdated: UserIdSearchRequest;
    memberRoleUpdated: UserIdSearchRequest;
    messageDeleted: MessageDeletedSearchRequest;
}
