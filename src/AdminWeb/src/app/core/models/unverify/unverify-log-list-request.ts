import { DateRange } from "../../../components";

export interface UnverifyLogListRequest {
  operation: number | null;
  fromUserId: string | null;
  toUserId: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  guildId: string | null;
  parentLogItemId: string | null;
}

export interface UnverifyLogFilter {
  operation: number | null;
  fromUserId: string | null;
  toUserId: string | null;
  created: DateRange | null;
  guildId: string | null;
  parentLogItemId: string | null;
}
