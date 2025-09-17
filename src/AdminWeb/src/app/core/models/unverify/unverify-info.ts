export interface UnverifyInfo {
  startAtUtc: string;
  endAtUtc: string;
  fromUserId: string | null;
  isSelfUnverify: boolean;
  reason: string | null;
  removedRolesCount: number;
  keepedRolesCount: number;
  removedChannelsCount: number;
  keepedChannelsCount: number;
}
