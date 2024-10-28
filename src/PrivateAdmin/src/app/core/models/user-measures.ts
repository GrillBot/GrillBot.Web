import { DateTime } from './datetime';
import { UserMeasuresType } from './enums/user-measures-type';
import { User } from './users';

export class UserMeasuresItem {
    public type: UserMeasuresType;
    public createdAt: DateTime;
    public moderator: User;
    public reason: string;
    public validTo?: DateTime;

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
