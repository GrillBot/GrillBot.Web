import { Guild } from "../models/guilds/guild";
import { User } from "../models/users/user";

export const mapUserToLookupRow = (user: User | null, userId?: string) => {
  if (!user) {
    return 'Neznámý uživatel' + (userId ? ` ${userId}` : '');
  }

  return user.globalAlias ? `${user.globalAlias} (${user.username})` : user.username;
};

export const mapGuildToLookupRow = (guild: Guild | null, guildId?: string) => {
  return guild?.name ?? 'Neznámý server' + (guildId ? ` ${guildId}` : '');
};
