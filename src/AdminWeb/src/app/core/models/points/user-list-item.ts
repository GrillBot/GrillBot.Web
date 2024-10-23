export interface UserListItem {
  guildId: string;
  userId: string;
  activePoints: number;
  expiredPoints: number;
  mergedPoints: number;
  pointsDeactivated: boolean;
}
