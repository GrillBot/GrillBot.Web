export interface SearchListItem {
  id: number;
  userId: string;
  guildId: string;
  channelId: string;
  content: string;
  createdAtUtc: string;
  validToUtc: string;
  isInvalid: boolean;
  isDeleted: boolean;
}
