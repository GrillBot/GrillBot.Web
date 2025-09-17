export interface UpdateUnverifyRequest {
  guildId: string;
  userId: string;
  newEndAtUtc: string;
  reason: string | null;
}
