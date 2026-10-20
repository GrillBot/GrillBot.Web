import { DateRange } from "../../../components";

export interface InfractionListParams {
  type: string | null;
  guildId: string | null;
  userId: string | null;
  moderatorId: string | null;
  createdFrom: string | null;
  createdTo: string | null;
}

export interface InfractionListFilter {
  type: string | null;
  guildId: string | null;
  userId: string | null;
  moderatorId: string | null;
  created: DateRange | null;
}
