export interface EmoteStatisticsListRequest {
  unsupported: boolean;
  guildId: string | null;
  userId: string | null;
  useCountFrom: number | null;
  useCountTo: number | null;
  firstOccurenceFrom: string | null;
  firstOccurenceTo: string | null;
  lastOccurenceFrom: string | null;
  lastOccurenceTo: string | null;
  ignoreAnimated: boolean;
  emoteName: string | null;
  emoteFullId: string | null;
}
