import { Channel } from './channels';
import { FilterBase } from './common';
import { Guild } from './guilds';

export class SearchingListItem {
    public id: number;
    public guild: Guild;
    public channel: Channel;
    public message: string;

    static create(data: any): SearchingListItem | null {
        if (!data) { return null; }
        const item = new SearchingListItem();

        item.channel = Channel.create(data.channel);
        item.guild = Guild.create(data.guild);
        item.id = data.id;
        item.message = data.message;

        return item;
    }
}

export class GetSearchingListParams extends FilterBase {
    public guildId: string | null = null;
    public channelId: string | null = null;
    public messageQuery: string | null = null;

    static get empty(): GetSearchingListParams { return new GetSearchingListParams(); }

    static create(form: any): GetSearchingListParams | null {
        if (!form) { return null; }
        const params = new GetSearchingListParams();

        params.guildId = form.guildId;
        params.channelId = form.channelId;
        params.messageQuery = form.messageQuery;

        return params;
    }
}
