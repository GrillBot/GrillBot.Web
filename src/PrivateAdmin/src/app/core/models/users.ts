import { FilterBase, List } from './common';
import { Dictionary } from 'src/app/core/models/common';
import { Support } from '../lib/support';
import { Channel, ChannelStatItem } from './channels';
import { DateTime } from './datetime';
import { EmoteStatItem } from './emotes';
import { UserFilterFlags, UserFilterMapping } from './enums/user-filter-flags';
import { UserFlags } from './enums/user-flags';
import { StatusColorMapping, UserStatus, UserStatusTexts } from './enums/user-status';
import { Guild } from './guilds';
import { Invite, InviteBase } from './invites';
import { UnverifyInfo } from './unverify';
import { Role } from './roles';
import { UserMeasuresItem } from './user-measures';

export class User {
    public id: string;
    public username: string;
    public isBot: boolean;
    public avatarUrl: string;
    public globalAlias: string;

    get displayName(): string {
        return !Support.isEmpty(this.globalAlias) ? this.globalAlias : this.username;
    }

    static create(data: any): User | null {
        if (!data) { return null; }

        const user = new User();

        user.id = data.id;
        user.isBot = data.isBot;
        user.avatarUrl = data.avatarUrl;
        user.username = data.username;
        user.globalAlias = data.globalAlias;

        return user;
    }
}

export class GuildUser extends User {
    public usedInvite: Invite | null;
    public points: number;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string | null;

    get fullname(): string {
        return !this.nickname ? this.username : `${this.nickname} (${this.username})`;
    }

    static create(data: any): GuildUser | null {
        if (!data) { return null; }
        const user = new GuildUser();

        Object.assign(user, super.create(data));
        user.givenReactions = data.givenReactions;
        user.nickname = data.nickname;
        user.obtainedReactions = data.obtainedReactions;
        user.points = data.points;
        user.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;

        return user;
    }
}

export class UserListItem {
    public id: string;
    public flags: number;
    public haveBirthday: boolean;
    public username: string;
    public guilds: Dictionary<string, boolean>;
    public discordStatus: UserStatus;
    public registeredAt: DateTime;
    public globalAlias: string;

    get isBotAdmin(): boolean { return (this.flags & UserFlags.BotAdmin) !== 0; }
    get haveWebAdmin(): boolean { return (this.flags & UserFlags.WebAdmin) !== 0; }
    get isBot(): boolean { return (this.flags & UserFlags.NotUser) !== 0; }
    get isWebAdminOnline(): boolean { return (this.flags & UserFlags.WebAdminOnline) !== 0; }

    get status(): string { return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.discordStatus)]; }
    get statusColor(): string { return StatusColorMapping[Support.getEnumKeyByValue(UserStatus, this.discordStatus)]; }

    static create(data: any): UserListItem | null {
        if (!data) { return null; }

        const item = new UserListItem();
        item.id = data.id;
        item.flags = data.flags;
        item.guilds = Object.keys(data.guilds).map(o => ({ key: o, value: data.guilds[o] }));
        item.haveBirthday = data.haveBirthday ?? false;
        item.username = data.username;
        item.discordStatus = data.discordStatus;
        item.registeredAt = data.registeredAt ? DateTime.fromISOString(data.registeredAt) : null;
        item.globalAlias = data.globalAlias;

        return item;
    }
}

export class GetUserListParams extends FilterBase {
    public username: string | null = null;
    public guildId: string | null = null;
    public flags = 0;
    public haveBirthday = false;
    public usedInviteCode: string | null = null;
    public status: UserStatus | null = null;
    public hideLeftUsers = false;

    static get empty(): GetUserListParams { return new GetUserListParams(); }

    static create(form: any): GetUserListParams {
        const params = GetUserListParams.empty;

        params.flags = this.buildFlags(form.flags);
        params.guildId = form.guildId;
        params.haveBirthday = (form.flags & UserFilterFlags.HaveBirthday) !== 0;
        params.username = form.username;
        params.usedInviteCode = form.usedInviteCode;
        params.status = form.status;
        params.hideLeftUsers = form.hideLeftUsers;

        return params;
    }

    private static buildFlags(flags: number): number {
        return UserFilterMapping
            .filter(o => (flags & o.source) !== 0).reduce((prev, curr) => prev | curr.destination, 0);
    }

    public serializeFlags(): number {
        let result = UserFilterMapping.filter(o => (this.flags & o.destination) !== 0).reduce((prev, curr) => prev | curr.source, 0);
        if (this.haveBirthday) { result |= UserFilterFlags.HaveBirthday; }

        return result;
    }

    serialize(): any {
        return {
            guildId: this.guildId,
            flags: this.serializeFlags(),
            username: this.username,
            usedInviteCode: this.usedInviteCode,
            status: this.status,
            hideLeftUsers: this.hideLeftUsers
        };
    }
}

export class UserDetail {
    public id: string;
    public username: string;
    public flags: number;
    public haveBirthday: boolean;
    public guilds: GuildUserDetail[];
    public status: UserStatus;
    public activeClients: string[];
    public isKnown: boolean;
    public avatarUrl: string;
    public selfUnverifyMinimalTime: string | null;
    public registeredAt: DateTime | null;
    public language: string | null;
    public globalAlias: string | null;

    get isBotAdmin(): boolean { return (this.flags & UserFlags.BotAdmin) !== 0; }
    get haveWebAdmin(): boolean { return (this.flags & UserFlags.WebAdmin) !== 0; }
    get isBot(): boolean { return (this.flags & UserFlags.NotUser) !== 0; }
    get isWebAdminOnline(): boolean { return (this.flags & UserFlags.WebAdminOnline) !== 0; }
    get isPublicAdminOnline(): boolean { return (this.flags & UserFlags.PublicAdminOnline) !== 0; }
    get commandsDisabled(): boolean { return (this.flags & UserFlags.CommandsDisabled) !== 0; }
    get pointsDisabled(): boolean { return (this.flags & UserFlags.PointsDisabled) !== 0; }

    static create(data: any): UserDetail | null {
        if (!data) { return null; }
        const detail = new UserDetail();

        detail.id = data.id;
        detail.username = data.username;
        detail.flags = data.flags;
        detail.haveBirthday = data.haveBirthday ?? false;
        detail.guilds = data.guilds?.map((o: any) => GuildUserDetail.create(o)).filter((o: GuildUserDetail) => o);
        detail.status = data.status;
        detail.activeClients = data.activeClients?.map((o: string) => o);
        detail.isKnown = data.isKnown;
        detail.avatarUrl = data.avatarUrl;
        detail.selfUnverifyMinimalTime = data.selfUnverifyMinimalTime;
        detail.registeredAt = data.registeredAt ? DateTime.fromISOString(data.registeredAt) : null;
        detail.language = data.language;
        detail.globalAlias = data.globalAlias;

        return detail;
    }
}

export class GuildUserDetail {
    public guild: Guild;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string;
    public usedInvite: Invite | null;
    public createdInvites: InviteBase[];
    public channels: ChannelStatItem[];
    public isGuildKnown: boolean;
    public isUserInGuild: boolean;
    public emotes: EmoteStatItem[];
    public unverify: UnverifyInfo | null;
    public nicknameHistory: string[];
    public visibleChannels: Channel[];
    public roles: Role[];
    public havePointsTransaction: boolean;
    public userMeasures: List<UserMeasuresItem>;

    static create(data: any): GuildUserDetail {
        const detail = new GuildUserDetail();

        detail.guild = Guild.create(data.guild);
        detail.givenReactions = data.givenReactions;
        detail.obtainedReactions = data.obtainedReactions;
        detail.nickname = data.nickname;
        detail.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;
        detail.createdInvites = data.createdInvites?.map((o: any) => InviteBase.create(o)).filter((o: InviteBase) => o);
        detail.channels = data.channels?.map((o: any) => ChannelStatItem.create(o)).filter((o: ChannelStatItem) => o);
        detail.isGuildKnown = data.isGuildKnown;
        detail.isUserInGuild = data.isUserInGuild;
        detail.emotes = data.emotes?.map((o: any) => EmoteStatItem.create(o)).filter((o: EmoteStatItem) => o);
        detail.unverify = data.unverify ? UnverifyInfo.create(data.unverify) : null;
        detail.nicknameHistory = data.nicknameHistory ? data.nicknameHistory.map((o: string) => o) : [];
        detail.visibleChannels = data.visibleChannels ? data.visibleChannels.map((o: any) => Channel.create(o)) : [];
        detail.roles = data.roles ? data.roles.map((o: any) => Role.create(o)) : [];
        detail.havePointsTransaction = data.havePointsTransaction;
        detail.userMeasures = data.userMeasures.map((o: any) => UserMeasuresItem.create(o));

        return detail;
    }
}

export class UpdateUserParams {
    constructor(
        public botAdmin: boolean,
        public webAdminAllowed: boolean,
        public selfUnverifyMinimalTime: string | null,
        public commandsDisabled: boolean,
        public pointsDisabled: boolean
    ) { }
}
