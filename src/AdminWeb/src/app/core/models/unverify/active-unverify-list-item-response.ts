export interface ActiveUnverifyListItemResponse {
  id: string;
  guildId: string;
  fromUserId: string;
  toUserId: string;
  startAtUtc: string;
  endAtUtc: string;
  isSelfUnverify: boolean;
  reason: string | null;
  removedRolesCount: number;
  keepedRolesCount: number;
  removedChannelsCount: number;
  keepedChannelsCount: number;
  isReadOnly: boolean;
}
