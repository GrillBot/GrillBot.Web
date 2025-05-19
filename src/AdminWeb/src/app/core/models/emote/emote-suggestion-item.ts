export interface EmoteSuggestionItem {
  id: string;
  fromUserId: string;
  name: string;
  suggestedAtUtc: string;
  guildId: string;
  notificationMessageId?: string;
  approvedForVote: boolean;
  approvalUserId?: string;
  approvedAtUtc?: string;
  reasonToAdd: string;
  voteStartAt?: string;
  voteEndAt?: string;
  voteKilledAt?: string;
  upVotes?: number;
  downVotes?: number;
}
