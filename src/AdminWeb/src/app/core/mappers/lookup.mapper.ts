import { Channel } from "../models/channels/channel";
import { User } from "../models/users/user";

export const mapUserToLookupRow = (user: User | null, userId?: string) => {
  if (!user) {
    return 'Neznámý uživatel' + (userId ? ` ${userId}` : '');
  }

  return user.globalAlias ? `${user.globalAlias} (${user.username})` : user.username;
};

export const mapChannelToLookupRow = (channel: Channel | null, channelId?: string) => {
  return channel?.name ?? 'Neznámý kanál' + (channelId ? ` ${channelId}` : '');
};
