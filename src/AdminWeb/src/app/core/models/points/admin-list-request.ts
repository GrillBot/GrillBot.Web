import { DateRange } from "../../../components";

export interface AdminListRequest {
  showMerged: boolean;
  guildId: string | null;
  userId: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  onlyReactions: boolean;
  onlyMessages: boolean;
  messageId: string | null;
}

export interface AdminListFilter {
  showMerged: boolean;
  guildId: string | null;
  userId: string | null;
  created: DateRange | null;
  onlyReactions: boolean;
  onlyMessages: boolean;
  messageId: string | null;
}
