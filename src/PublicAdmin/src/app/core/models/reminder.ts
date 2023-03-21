import { DateTime } from './datetime';
import { User } from './users';
import { FilterBase } from './common';

export class RemindMessage {
    public id: number;
    public fromUser: User | null;
    public at: DateTime;
    public message: string;
    public postpone: number;
    public notified: boolean;

    static create(data: any): RemindMessage | null {
        if (!data) { return null; }
        const message = new RemindMessage();

        message.at = DateTime.fromISOString(data.at);
        message.fromUser = data.fromUser ? User.create(data.fromUser) : null;
        message.id = data.id;
        message.message = data.message;
        message.postpone = data.postpone;
        message.notified = data.notified;

        return message;
    }
}

export class GetReminderListParams extends FilterBase {
    public fromUserId: string | null = null;
    public messageContains: string | null = null;
    public createdFrom: string | null = null;
    public createdTo: string | null = null;
    public onlyWaiting = false;

    static get empty(): GetReminderListParams { return new GetReminderListParams(); }

    static create(form: any): GetReminderListParams | null {
        if (!form) { return null; }
        const params = new GetReminderListParams();

        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.fromUserId = form.fromUserId;
        params.messageContains = form.messageContains;
        params.onlyWaiting = form.onlyWaiting;

        return params;
    }
}
