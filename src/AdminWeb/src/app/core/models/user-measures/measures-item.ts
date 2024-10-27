export interface MeasuresItem {
  measureId: string;
  type: string;
  createdAtUtc: string;
  moderatorId: string;
  userId: string;
  guildId: string;
  validTo: string | null;
  reason: string;
}
