import { FilterBase } from './common';
import { DateTime } from './datetime';
import { User } from './users';

export class RemindMessage {
    public id: number;
    public fromUser: User | null;
    public toUser: User | null;
    public at: DateTime;
    public message: string;
    public postpone: number;
    public notified: boolean;
    public language: string;

    static create(data: any): RemindMessage | null {
        if (!data) { return null; }
        const message = new RemindMessage();

        message.at = DateTime.fromISOString(data.at);
        message.fromUser = data.fromUser ? User.create(data.fromUser) : null;
        message.id = data.id;
        message.message = data.message;
        message.postpone = data.postpone;
        message.toUser = data.toUser ? User.create(data.toUser) : null;
        message.notified = data.notified;
        message.language = data.language;

        return message;
    }
}

export class GetReminderListParams extends FilterBase {
    public fromUserId: string | null = null;
    public toUserId: string | null = null;
    public originalMessageId: string | null = null;
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
        params.originalMessageId = form.originalMessageId;
        params.toUserId = form.toUserId;
        params.onlyWaiting = form.onlyWaiting;

        return params;
    }
}
