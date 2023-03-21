import { FilterBase } from './common';
import { DateTime } from './datetime';
import { Guild } from './guilds';
import { User } from './users';

export class InviteBase {
    public code: string;
    public createdAt?: DateTime;

    static create(data: any): InviteBase | null {
        if (!data) { return null; }
        const item = new InviteBase();

        item.code = data.code;
        item.createdAt = data.createdAt ? DateTime.fromISOString(data.createdAt) : null;

        return item;
    }
}

export class Invite extends InviteBase {
    public creator: User;
    public usedUsersCount: number;

    static create(data: any): Invite {
        if (!data) { return null; }
        const invite = new Invite();

        Object.assign(invite, super.create(data));
        invite.creator = data.creator ? User.create(data.creator) : null;
        invite.usedUsersCount = data.usedUsersCount;

        return invite;
    }
}

export class GuildInvite extends Invite {
    public guild: Guild;

    static create(data: any): GuildInvite | null {
        if (!data) { return null; }
        const invite = new GuildInvite();

        Object.assign(invite, super.create(data));
        invite.guild = data.guild ? Guild.create(data.guild) : null;

        return invite;
    }
}

export class GetInviteListParams extends FilterBase {
    public guildId: string | null = null;
    public creatorId: string | null = null;
    public code: string | null = null;
    public createdFrom: string | null = null;
    public createdTo: string | null = null;
    public showUnused: boolean = false;

    static get empty(): GetInviteListParams { return new GetInviteListParams(); }

    static create(form: any): GetInviteListParams | null {
        if (!form) { return null; }
        const params = new GetInviteListParams();

        params.code = form.code;
        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.creatorId = form.creatorId;
        params.guildId = form.guildId;
        params.showUnused = form.showUnused;

        return params;
    }
}
