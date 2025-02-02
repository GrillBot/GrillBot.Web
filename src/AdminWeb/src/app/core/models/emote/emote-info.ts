import { EmoteInfoStatistics } from "./emote-info-statistics";

export interface EmoteInfo {
  emoteName: string;
  isEmoteAnimated: boolean;
  emoteUrl: string;
  ownerGuildId: string | null;
  statistics: EmoteInfoStatistics | null;
}
