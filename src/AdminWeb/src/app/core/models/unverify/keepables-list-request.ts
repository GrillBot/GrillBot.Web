import { DateRange } from "../../../components";

export interface KeepablesListRequest {
  group: string | null;
  createdFrom: string | null;
  createdTo: string | null;
}

export interface KeepablesListFilter {
  group: string | null;
  created: DateRange | null;
}
