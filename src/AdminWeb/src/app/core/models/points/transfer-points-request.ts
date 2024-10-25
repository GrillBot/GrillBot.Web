export interface TransferPointsRequest {
  guildId: string | null;
  fromUserId: string | null;
  toUserId: string | null;
  amount: number | null;
}
