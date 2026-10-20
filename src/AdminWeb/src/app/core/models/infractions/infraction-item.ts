export interface InfractionItem {
  infractionId: string;
  type: string;
  createdAtUtc: string;
  moderatorId: string;
  userId: string;
  guildId: string;
  validTo: string | null;
  reason: string;
}
