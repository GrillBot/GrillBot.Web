import { FilterBase } from './common';
import { DateTime } from './datetime';
import { Guild } from './guilds';
import { User } from './users';

export class PointsMergeInfo {
    public mergeRangeFrom: DateTime;
    public mergeRangeTo: DateTime | null;
    public mergedItemsCount: number;

    static create(data: any): PointsMergeInfo | null {
        if (!data) { return null; }

        const info = new PointsMergeInfo();
        info.mergeRangeFrom = DateTime.fromISOString(data.mergeRangeFrom);
        info.mergeRangeTo = data.mergeRangeTo ? DateTime.fromISOString(data.mergeRangeTo) : null;
        info.mergedItemsCount = data.mergedItemsCount;

        return info;
    }
}

export class PointsTransaction {
    public guild: Guild;
    public user: User;
    public messageId: string;
    public reactionId = '';
    public createdAt: DateTime;
    public points: number;
    public mergeInfo: PointsMergeInfo | null;

    static create(data: any): PointsTransaction | null {
        if (!data) { return null; }

        const transaction = new PointsTransaction();
        transaction.createdAt = DateTime.fromISOString(data.createdAt);
        transaction.guild = Guild.create(data.guild);
        transaction.reactionId = data.reactionId;
        transaction.messageId = data.messageId;
        transaction.points = data.points;
        transaction.user = User.create(data.user);
        transaction.mergeInfo = data.mergeInfo ? PointsMergeInfo.create(data.mergeInfo) : null;

        return transaction;
    }
}

export class PointsChartItem {
    public day: DateTime;
    public messagePoints: number;
    public reactionPoints: number;

    get totalPoints(): number {
        return this.messagePoints + this.reactionPoints;
    }

    static create(data: any): PointsChartItem {
        const result = new PointsChartItem();
        result.day = DateTime.fromISOString(data.day);
        result.messagePoints = data.messagePoints;
        result.reactionPoints = data.reactionPoints;

        return result;
    }
}

export class AdminListRequest extends FilterBase {
    public showMerged = false;
    public guildId: string | null;
    public userId: string | null;
    public createdFrom: string | null;
    public createdTo: string | null;
    public onlyReactions: boolean;
    public onlyMessages: boolean;
    public messageId: string | null;

    static get empty(): AdminListRequest { return new AdminListRequest(); }

    static fromForm(form: any): AdminListRequest | null {
        const params = new AdminListRequest();
        params.guildId = form.guildId;
        params.userId = form.userId;
        params.createdFrom = form.assignedAtFrom;
        params.createdTo = form.assignedAtTo;
        params.onlyReactions = form.onlyReactions ?? false;
        params.onlyMessages = form.onlyMessages ?? false;
        params.messageId = form.messageId;

        return params;
    }

    public serialize(): any {
        return {
            guildId: this.guildId,
            userId: this.userId,
            assignedAtFrom: this.createdFrom,
            assignedAtTo: this.createdTo,
            onlyReactions: this.onlyReactions,
            onlyMessages: this.onlyMessages,
            messageId: this.messageId
        };
    }
}

export class UserPointsItem {
    public user: User | null = null;
    public guild: Guild | null = null;
    public nickname: string | null = null;
    public pointsYearBack = 0;
    public pointsMonthBack = 0;
    public pointsToday = 0;
    public totalPoints = 0;

    get anyPoints(): boolean { return this.totalPoints > 0; }

    static create(data: any): UserPointsItem | null {
        if (!data) { return null; }
        const item = new UserPointsItem();

        item.user = User.create(data.user);
        item.guild = Guild.create(data.guild);
        item.nickname = data.nickname;
        item.pointsYearBack = data.pointsYearBack;
        item.pointsMonthBack = data.pointsMonthBack;
        item.pointsToday = data.pointsToday;
        item.totalPoints = data.totalPoints;

        return item;
    }
}

export class UserListRequest extends FilterBase {
    public guildId: string | null;

    static get empty(): UserListRequest { return new UserListRequest(); }

    static fromForm(form: any): UserListRequest | null {
        const params = new UserListRequest();
        params.guildId = form.guildId;

        return params;
    }

    public serialize(): any {
        return {
            guildId: this.guildId,
        };
    }
}

export class UserListItem {
    public guild: Guild;
    public user: User;
    public activePoints: number;
    public expiredPoints: number;
    public mergedPoints: number;

    static create(data: any): UserListItem {
        const item = new UserListItem();

        item.guild = Guild.create(data.guild);
        item.user = User.create(data.user);
        item.activePoints = data.activePoints;
        item.expiredPoints = data.expiredPoints;
        item.mergedPoints = data.mergedPoints;

        return item;
    }
}
