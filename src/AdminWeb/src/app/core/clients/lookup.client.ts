import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { User } from "../models/users/user";
import { Guild } from "../models/guilds/guild";
import { filter, map } from "rxjs";
import { Channel } from "../models/channels/channel";
import { Role } from "../models/roles/role";
import { MessageResponse } from "../models/common";

@Injectable({ providedIn: 'root' })
export class LookupClient extends BaseClient {
  resolveGuild = (guildId: string) => this.getRequest<Guild>(`lookup/guild/${guildId}`).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value!)
  );

  resolveGuildList = () => this.getRequest<Guild[]>('lookup/guild/list');

  resolveChannel = (channelId: string) => this.getRequest<Channel>(`lookup/channel/${channelId}`).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value!)
  );

  resolveChannelList = () => this.getRequest<Channel[]>('lookup/channel/list');

  resolveRole = (roleId: string) => this.getRequest<Role>(`lookup/role/${roleId}`).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value!)
  );

  resolveUser = (userId: string) => this.getRequest<User>(`lookup/user/${userId}`).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value!)
  );

  resolveUserList = () => this.getRequest<User[]>('lookup/user/list');

  resolveSasLink = (filename: string) => this.getRequest<MessageResponse>('lookup/sas', { filename }).pipe(
    filter(res => res.type === 'finish'),
    map(res => res.value?.message ?? '')
  );
}
