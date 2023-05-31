import { ApiRequestFilter, ExecutionFilter, MessageDeletedFilter, TargetIdFilter, TextFilter } from 'src/app/core/models/audit-log';

export interface ExtendedFilterData {
    info: TextFilter;
    warning: TextFilter;
    error: TextFilter;
    interaction: ExecutionFilter;
    job: ExecutionFilter;
    api: ApiRequestFilter;
    overwriteCreated: TargetIdFilter;
    overwriteDeleted: TargetIdFilter;
    overwriteUpdated: TargetIdFilter;
    memberUpdated: TargetIdFilter;
    memberRoleUpdated: TargetIdFilter;
    messageDeleted: MessageDeletedFilter;
}
