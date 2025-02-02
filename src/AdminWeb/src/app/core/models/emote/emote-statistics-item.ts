export interface EmoteStatisticsItem {
  guildId: string;
  emoteId: string;
  emoteName: string;
  emoteIsAnimated: boolean;
  emoteUrl: string | null;
  useCount: number;
  usersCount: number;
  firstOccurence: string;
  lastOccurence: string;
}
