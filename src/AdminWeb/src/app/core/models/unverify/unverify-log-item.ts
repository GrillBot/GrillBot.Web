export interface UnverifyLogItem {
  id: string;
  parentItemId: string | null;
  logNumber: number;
  type: number;
  guildId: string;
  fromUserId: string;
  toUserId: string;
  createdAtUtc: string;
  preview: any | null;
}
