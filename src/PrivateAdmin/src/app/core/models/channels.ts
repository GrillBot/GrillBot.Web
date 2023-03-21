import { Support } from '../lib/support';
import { FilterBase } from './common';
import { DateTime } from './datetime';
import { ChannelFlagMapping, ChannelFlags } from './enums/channel-flags';
import { ChannelType, ChannelTypeTexts } from './enums/channel-type';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class Channel {
    public id: string;
    public name: string;
    public type: ChannelType;
    public flags: number;

    get fullFormat(): string {
        return `#${this.name} (${this.id})`;
    }

    get isThread(): boolean {
        return this.type === ChannelType.PublicThread || this.type === ChannelType.PrivateThread;
    }

    get channelTypeName(): string {
        return ChannelTypeTexts[Support.getEnumKeyByValue(ChannelType, this.type)];
    }

    get isDeleted(): boolean {
        return (this.flags & ChannelFlags.Deleted) !== 0;
    }

    static create(data: any): Channel | null {
        if (!data) { return null; }

        const channel = new Channel();

        channel.name = data.name;
        channel.type = data.type;
        channel.id = data.id;
        channel.flags = data.flags;

        return channel;
    }
}

export class ChannelStatItem {
    public channel: Channel;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelStatItem | null {
        if (!data) { return null; }
        const item = new ChannelStatItem();

        item.channel = Channel.create(data.channel);
        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);

        return item;
    }
}

export class SendMessageToChannelParams {
    public content: string;
    public reference: string | null;

    static create(form: any): SendMessageToChannelParams | null {
        if (!form) { return null; }
        const params = new SendMessageToChannelParams();

        params.content = form.content;
        params.reference = form.reference;

        return params;
    }
}

export class GetChannelListParams extends FilterBase {
    public guildId: string | null = null;
    public nameContains: string | null = null;
    public channelType: ChannelType | null = null;
    public hideDeleted: boolean = true;

    static get empty(): GetChannelListParams { return new GetChannelListParams(); }

    static create(form: any): GetChannelListParams | null {
        if (!form) { return null; }
        const params = new GetChannelListParams();

        params.channelType = form.channelType;
        params.guildId = form.guildId;
        params.nameContains = form.nameContains;
        params.hideDeleted = form.hideDeleted;

        return params;
    }
}

export class GuildChannelListItem extends Channel {
    public cachedMessagesCount: number;
    public firstMessageAt: DateTime | null;
    public lastMessageAt: DateTime | null;
    public messagesCount: number;
    public guild: Guild;
    public rolePermissionsCount?: number;
    public userPermissionsCount?: number;

    get isCategory(): boolean { return this.type === ChannelType.Category; }

    static create(data: any): GuildChannelListItem | null {
        if (!data) { return null; }
        const channel = new GuildChannelListItem();

        Object.assign(channel, super.create(data));
        channel.cachedMessagesCount = data.cachedMessagesCount;
        channel.firstMessageAt = data.firstMessageAt ? DateTime.fromISOString(data.firstMessageAt) : null;
        channel.lastMessageAt = data.lastMessageAt ? DateTime.fromISOString(data.lastMessageAt) : null;
        channel.messagesCount = data.messagesCount;
        channel.guild = data.guild ? Guild.create(data.guild) : null;
        channel.rolePermissionsCount = data.rolePermissionsCount;
        channel.userPermissionsCount = data.userPermissionsCount;

        return channel;
    }
}

export class ChannelDetail extends GuildChannelListItem {
    public lastMessageFrom: User | null;
    public mostActiveUser: User | null;
    public parentChannel: Channel | null;
    public threads: Channel[] | null;

    static create(data: any): ChannelDetail | null {
        if (!data) { return null; }
        const detail = new ChannelDetail();

        Object.assign(detail, super.create(data));
        detail.lastMessageFrom = data.lastMessageFrom ? User.create(data.lastMessageFrom) : null;
        detail.mostActiveUser = data.mostActiveUser ? User.create(data.mostActiveUser) : null;
        detail.name = data.name;
        detail.type = data.type;
        detail.parentChannel = data.parentChannel ? Channel.create(data.parentChannel) : null;
        detail.threads = data.threads ? data.threads.map((o: Channel) => Channel.create(o)) : null;

        return detail;
    }
}

export class ChannelUserStatItem {
    public position: number;
    public username: string;
    public nickname: string | null;
    public userId: string;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelUserStatItem | null {
        if (!data) { return null; }
        const item = new ChannelUserStatItem();

        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);
        item.nickname = data.nickname;
        item.position = data.position;
        item.userId = data.userId;
        item.username = data.username;

        return item;
    }
}

export class UpdateChannelParams {
    public flags: number;

    static create(form: any): UpdateChannelParams | null {
        if (!form) { return null; }

        const params = new UpdateChannelParams();
        params.flags = ChannelFlagMapping.filter(o => (form.flags & o.source) !== 0).reduce((prev, curr) => prev | curr.destination, 0);

        return params;
    }
}
