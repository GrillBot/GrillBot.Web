export interface TransactionItem {
  guildId: string;
  userId: string;
  messageId: string;
  reactionId: string;
  createdAt: string;
  value: number;
  mergedCount: number;
  mergedFrom?: string;
  mergedTo?: string;
}
