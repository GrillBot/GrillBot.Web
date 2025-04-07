export interface Invite {
  code: string;
  guildId: string;
  creatorId?: string;
  createdAt?: string;
  uses: number;
}
