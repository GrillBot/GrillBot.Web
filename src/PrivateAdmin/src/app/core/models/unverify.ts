import { UnverifyOperation, UnverifyOperationTexts } from './enums/unverify-operation';
import { DateTime } from './datetime';
import { Role } from './roles';
import { GuildUser, User } from './users';
import { Guild } from './guilds';
import { Support } from '../lib/support';
import { FilterBase, RangeParams, createRangeParams, TemplateBinding } from './common';

export class UnverifyInfo {
    public start: DateTime;
    public end: DateTime;
    public endTo: string;
    public reason: string | null;
    public isSelfUnverify: boolean;

    static create(data: any): UnverifyInfo | null {
        if (!data) { return null; }

        const info = new UnverifyInfo();
        info.start = DateTime.fromISOString(data.start);
        info.end = DateTime.fromISOString(data.end);
        info.endTo = data.endTo;
        info.reason = data.reason;
        info.isSelfUnverify = data.isSelfUnverify;

        return info;
    }
}

export class UnverifyUserProfile extends UnverifyInfo {
    public user: User;
    public start: DateTime;
    public end: DateTime;
    public endTo: string;
    public rolesToRemove: Role[];
    public rolesToKeep: Role[];
    public channelsToKeep: string[];
    public channelsToRemove: string[];
    public reason: string | null;
    public isSelfUnverify: boolean;
    public guild: Guild;

    public updateTimeBinding?: TemplateBinding;

    static create(data: any): UnverifyUserProfile | null {
        if (!data) { return null; }
        const profile = new UnverifyUserProfile();

        Object.assign(profile, super.create(data));
        profile.user = User.create(data.user);
        profile.rolesToKeep = data.rolesToKeep.map((o: any) => Role.create(o));
        profile.rolesToRemove = data.rolesToRemove.map((o: any) => Role.create(o));
        profile.channelsToKeep = data.channelsToKeep.map((o: any) => o as string);
        profile.channelsToRemove = data.channelsToRemove.map((o: any) => o as string);
        profile.guild = Guild.create(data.guild);

        return profile;
    }
}

export class UnverifyLogItem {
    public id: number;
    public operation: UnverifyOperation;
    public guild: Guild;
    public fromUser: GuildUser;
    public toUser: GuildUser;
    public createdAt: DateTime;
    public removeData: UnverifyLogRemove | null;
    public setData: UnverifyLogSet | null;
    public updateData: UnverifyLogUpdate | null;

    get formattedOperation(): string {
        return UnverifyOperationTexts[Support.getEnumKeyByValue(UnverifyOperation, this.operation)];
    }

    get anyData(): boolean {
        return !!this.removeData || !!this.setData || !!this.updateData;
    }

    get isUnverify(): boolean {
        return this.operation === UnverifyOperation.Unverify || this.operation === UnverifyOperation.Selfunverify;
    }

    static create(data: any): UnverifyLogItem | null {
        if (!data) { return null; }
        const item = new UnverifyLogItem();

        item.createdAt = DateTime.fromISOString(data.createdAt);
        item.fromUser = GuildUser.create(data.fromUser);
        item.guild = Guild.create(data.guild);
        item.id = data.id;
        item.operation = data.operation;
        item.removeData = data.removeData ? UnverifyLogRemove.create(data.removeData) : null;
        item.setData = data.setData ? UnverifyLogSet.create(data.setData) : null;
        item.toUser = GuildUser.create(data.toUser);
        item.updateData = data.updateData ? UnverifyLogUpdate.create(data.updateData) : null;

        return item;
    }
}

export class UnverifyLogRemove {
    public returnedRoles: Role[];
    public returnedChannels: string[];
    public fromWeb: boolean;

    static create(data: any): UnverifyLogRemove | null {
        if (!data) { return null; }
        const item = new UnverifyLogRemove();

        item.returnedChannels = data.returnedChannelIds.map((o: any) => o as string);
        item.returnedRoles = data.returnedRoles.map((o: any) => Role.create(o));
        item.fromWeb = data.fromWeb;

        return item;
    }
}

export class UnverifyLogSet {
    public start: DateTime;
    public end: DateTime;
    public rolesToKeep: Role[];
    public rolesToRemove: Role[];
    public channelsToKeep: string[];
    public channelsToRemove: string[];
    public reason: string | null;
    public isSelfUnverify: boolean;

    static create(data: any): UnverifyLogSet | null {
        if (!data) { return null; }
        const item = new UnverifyLogSet();

        item.start = DateTime.fromISOString(data.start);
        item.channelsToKeep = data.channelIdsToKeep.map((o: any) => o as string);
        item.channelsToRemove = data.channelIdsToRemove.map((o: any) => o as string);
        item.end = DateTime.fromISOString(data.end);
        item.isSelfUnverify = data.isSelfUnverify;
        item.reason = data.reason;
        item.rolesToKeep = data.rolesToKeep.map((o: any) => Role.create(o));
        item.rolesToRemove = data.rolesToRemove.map((o: any) => Role.create(o));

        return item;
    }
}

export class UnverifyLogUpdate {
    public start: DateTime;
    public end: DateTime;

    static create(data: any): UnverifyLogUpdate | null {
        if (!data) { return null; }
        const item = new UnverifyLogUpdate();

        item.start = DateTime.fromISOString(data.start);
        item.end = DateTime.fromISOString(data.end);

        return item;
    }
}

export class UnverifyLogParams extends FilterBase {
    public operation: UnverifyOperation | null = null;
    public guildId: string | null = null;
    public fromUserId: string | null = null;
    public toUserId: string | null = null;
    public created: RangeParams<string> | null;

    static get empty(): UnverifyLogParams { return new UnverifyLogParams(); }

    static create(form: any): UnverifyLogParams | null {
        if (!form) { return null; }
        const params = new UnverifyLogParams();

        params.created = createRangeParams(form.createdFrom, form.createdTo);
        params.fromUserId = form.fromUserId;
        params.guildId = form.guildId;
        params.operation = form.operation;
        params.toUserId = form.toUserId;

        return params;
    }

    public serialize(): any {
        return {
            createdFrom: this.created?.from,
            createdTo: this.created?.to,
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
            operation: this.operation,
            guildId: this.guildId
        };
    }
}

export class UpdateUnverifyParams {
    constructor(
        public endAt: string,
        public reason: string
    ) { }
}
