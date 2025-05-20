import { DateRange } from "../../../components";

export interface SearchingListRequest {
  userId: string | null;
  guildId: string | null;
  channelId: string | null;
  messageQuery: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  validFrom: string | null;
  validTo: string | null;
  hideInvalid: boolean;
  showDeleted: boolean;
}

export interface SearchingListFilter {
  userId: string | null;
  guildId: string | null;
  channelId: string | null;
  messageQuery: string | null;
  created: DateRange | null;
  valid: DateRange | null;
  hideInvalid: boolean;
  showDeleted: boolean;
}
