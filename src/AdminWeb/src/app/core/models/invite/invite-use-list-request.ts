export interface InviteUseListRequest {
  guildId: string;
  code: string;
  usedFrom?: string;
  usedTo?: string;
}
