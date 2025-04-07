export interface InviteListRequest {
  guildId?: string;
  creatorId?: string;
  onlyWithoutCreator: boolean;
  code?: string;
  createdFrom?: string;
  createdTo?: string;
}
