import { AdvancedSearchRequest, FormSearchRequest, SearchRequest } from "../models/audit-log";

const mapAdvancedFilter = (request: FormSearchRequest): AdvancedSearchRequest | null => {
  const isAny = Object.keys(request)
    .filter(k => k.startsWith('adv_'))
    .some(k => request[k as keyof FormSearchRequest]);

  if ((request.showTypes ?? []).length === 0 || !isAny) {
    return null;
  }

  return {
    api: request.adv_api,
    error: request.adv_error,
    info: request.adv_info,
    interaction: request.adv_interaction,
    job: request.adv_jobs,
    memberRolesUpdated: request.adv_memberRolesUpdated,
    memberUpdated: request.adv_memberUpdated,
    messageDeleted: request.adv_messageDeleted,
    overwriteCreated: request.adv_overwriteCreated,
    overwriteDeleted: request.adv_overwriteDeleted,
    overwriteUpdated: request.adv_overwriteUpdated,
    warning: request.adv_warning
  };
};

export const mapAuditLogSearchRequest = (request: FormSearchRequest): SearchRequest => {
  return {
    guildId: request.guildId,
    channelId: request.channelId,
    createdFrom: request.created?.from ?? null,
    createdTo: request.created?.to ?? null,
    ids: request.ids?.split(',').map(o => o.trim()) ?? null,
    ignoreTypes: request.ignoreTypes ?? [],
    onlyWithFiles: request.onlyWithFiles,
    showTypes: request.showTypes ?? [],
    userIds: request.userId ? [request.userId] : [],
    advancedSearch: mapAdvancedFilter(request)
  };
};
