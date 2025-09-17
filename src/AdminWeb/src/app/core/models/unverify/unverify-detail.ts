import { ChannelOverride } from "./channel-override";

export interface UnverifyDetail {
  id: string;
  logNumber: number;
  startAtUtc: string;
  endAtUtc: string;
  fromUserId: string;
  reason: string | null;
  language: string;
  keepMutedRole: boolean;
  removedRoles: string[];
  keepedRoles: string[];
  removedChannels: ChannelOverride[];
  keepedChannels: ChannelOverride[];
}
