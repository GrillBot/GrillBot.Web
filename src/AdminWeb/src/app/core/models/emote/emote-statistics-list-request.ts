import { DateRange } from "../../../components";

export interface EmoteStatisticsListRequest {
  unsupported: boolean;
  guildId: string | null;
  userId: string | null;
  useCountFrom: number | null;
  useCountTo: number | null;
  firstOccurenceFrom: string | null;
  firstOccurenceTo: string | null;
  lastOccurenceFrom: string | null;
  lastOccurenceTo: string | null;
  ignoreAnimated: boolean;
  emoteName: string | null;
  emoteFullId: string | null;
}

export interface EmoteStatisticsListFilter {
  unsupported: boolean;
  guildId: string | null;
  userId: string | null;
  useCountFrom: number | null;
  useCountTo: number | null;
  firstOccurence: DateRange | null;
  lastOccurence: DateRange | null;
  ignoreAnimated: boolean;
  emoteName: string | null;
  emoteFullId: string | null;
}
