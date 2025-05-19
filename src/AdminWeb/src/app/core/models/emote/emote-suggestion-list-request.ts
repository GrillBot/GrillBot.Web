export interface EmoteSuggestionsListRequest {
  guildId?: string;
  fromUserId?: string;
  suggestedFrom?: string;
  suggestedTo?: string;
  nameContains?: string;
  approvalState?: boolean;
}
