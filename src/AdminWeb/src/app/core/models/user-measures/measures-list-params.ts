import { DateRange } from "../../../components";

export interface MeasuresListParams {
  type: string | null;
  guildId: string | null;
  userId: string | null;
  moderatorId: string | null;
  createdFrom: string | null;
  createdTo: string | null;
}

export interface MeasuresListFilter {
  type: string | null;
  guildId: string | null;
  userId: string | null;
  moderatorId: string | null;
  created: DateRange | null;
}
