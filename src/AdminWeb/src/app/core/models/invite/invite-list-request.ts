import { DateRange } from "../../../components";

export interface InviteListRequest {
  guildId?: string;
  creatorId?: string;
  onlyWithoutCreator: boolean;
  code?: string;
  createdFrom?: string;
  createdTo?: string;
}

export interface InviteListFilter {
  guildId?: string;
  creatorId?: string;
  onlyWithoutCreator: boolean;
  code?: string;
  created?: DateRange;
}
