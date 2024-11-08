export interface ReminderListRequest {
  fromUserId: string | null;
  toUserId: string | null;
  commandMessageId: string | null;
  messageContains: string | null;
  notifyAtFromUtc: string | null;
  notifyAtToUtc: string | null;
  onlyPending: boolean | null;
  onlyInProcess: boolean | null;
}
