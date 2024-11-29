export interface SearchingListRequest {
  userId: string | null;
  guildId: string | null;
  channelId: string | null;
  messageQuery: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  validFrom: string | null;
  validTo: string | null;
  hideInvalid: boolean;
  showDeleted: boolean;
}
