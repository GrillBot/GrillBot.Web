import { DateRange } from "../../../components";

export interface EmoteSuggestionsListRequest {
  guildId?: string;
  fromUserId?: string;
  suggestedFrom?: string;
  suggestedTo?: string;
  nameContains?: string;
  approvalState?: boolean;
}

export interface EmoteSuggestionsListFilter {
  guildId?: string;
  fromUserId?: string;
  suggested?: DateRange | null;
  nameContains?: string;
  approvalState?: boolean;
}
