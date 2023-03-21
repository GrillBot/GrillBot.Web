import { Support } from '../lib/support';
import { DateTime } from './datetime';
import { ChannelType } from './enums/channel-type';
import { Guild } from './guilds';

export class Channel {
    public id: string;
    public name: string;
    public type: ChannelType;

    static create(data: any): Channel | null {
        if (!data) { return null; }

        const channel = new Channel();

        channel.name = data.name;
        channel.type = data.type;
        channel.id = data.id;

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

export class GuildChannel {
    public id: string;
    public name: string;
    public type: ChannelType;
    public guild: Guild;

    get channelTypeName(): string {
        return Support.getEnumKeyByValue(ChannelType, this.type);
    }

    static create(data: any): GuildChannel | null {
        if (!data) { return null; }
        const channel = new GuildChannel();

        channel.id = data.id;
        channel.guild = data.guild ? Guild.create(data.guild) : null;
        channel.name = data.name;
        channel.type = data.type;

        return channel;
    }
}

export class ChannelboardItem {
    public channel: GuildChannel;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelboardItem | null {
        if (!data) { return null; }
        const item = new ChannelboardItem();

        /* eslint-disable */
        item.channel = GuildChannel.create(data.channel);
        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);
        /* eslint-enable */

        return item;
    }
}
