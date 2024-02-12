import { Support } from '../lib/support';
import { FilterBase } from './common';
import { DateTime } from './datetime';
import { UserMeasuresType, UserMeasuresTypeText } from './enums/user-measures-type';
import { Guild } from './guilds';
import { User } from './users';

export class UserMeasuresItem {
    public type: UserMeasuresType;
    public createdAt: DateTime;
    public moderator: User;
    public reason: string;
    public validTo?: DateTime;

    get typeAsText(): string { return UserMeasuresTypeText[Support.getEnumKeyByValue(UserMeasuresType, this.type)]; }

    static create(data: any): UserMeasuresItem {
        const item = new UserMeasuresItem();

        item.type = data.type;
        item.createdAt = DateTime.fromISOString(data.createdAt);
        item.moderator = User.create(data.moderator);
        item.reason = data.reason;

        if (data.validTo) {
            item.validTo = DateTime.fromISOString(data.validTo);
        }

        return item;
    }
}

export class UserMeasuresListItem extends UserMeasuresItem {
    public guild: Guild;
    public user: User;

    static create(data: any): UserMeasuresListItem {
        const item = new UserMeasuresListItem();

        Object.assign(item, super.create(data));
        item.guild = Guild.create(data.guild);
        item.user = User.create(data.user);

        return item;
    }
}

export class MeasuresListParams extends FilterBase {
    public type: string;
    public guildId: string;
    public userId: string;
    public moderatorId: string;
    public createdFrom: string;
    public createdTo: string;

    static get empty(): MeasuresListParams { return new MeasuresListParams(); }

    get serialized(): any {
        return {
            type: this.type,
            guildId: this.guildId,
            userId: this.userId,
            moderatorId: this.moderatorId,
            createdFrom: this.createdFrom,
            createdTo: this.createdTo
        };
    }

    static create(data: any): MeasuresListParams {
        const params = new MeasuresListParams();

        params.type = data.type;
        params.guildId = data.guildId;
        params.userId = data.userId;
        params.moderatorId = data.moderatorId;
        params.createdFrom = data.createdFrom;
        params.createdTo = data.createdTo;

        return params;
    }
}

export class CreateUserMeasuresWarningParams {
    constructor(
        public guildId: string,
        public userId: string,
        public message: string
    ) { }
}
