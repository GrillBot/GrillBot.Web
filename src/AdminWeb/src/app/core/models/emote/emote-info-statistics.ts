export interface EmoteInfoStatistics {
  firstOccurenceUtc: string;
  lastOccurenceUtc: string;
  useCount: number;
  usersCount: number;
  topUsers: { [userId: string]: number };
}
