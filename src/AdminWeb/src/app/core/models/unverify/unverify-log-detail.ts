import { UnverifyLogSimpleDetail } from "./unverify-log-simple-detail";

export interface UnverifyLogDetail {
  id: string;
  logNumber: number;
  parentInfo: UnverifyLogSimpleDetail | null;
  operationType: number;
  guildId: string;
  fromUserId: string;
  toUserId: string;
  createdAtUtc: string;
  data: any | null;
}
