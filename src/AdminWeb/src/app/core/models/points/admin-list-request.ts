export interface AdminListRequest {
  showMerged: boolean;
  guildId: string | null;
  userId: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  onlyReactions: boolean;
  onlyMessages: boolean;
  messageId: string | null;
}
