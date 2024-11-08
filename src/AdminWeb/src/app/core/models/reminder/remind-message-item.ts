export interface RemindMessageItem {
  id: number;
  fromUserId: string;
  toUserId: string;
  notifyAtUtc: string;
  message: string;
  postponeCount: number;
  notificationMessageId: string;
  commandMessageId: string;
  language: string;
  isSendInProgress: boolean;
}
