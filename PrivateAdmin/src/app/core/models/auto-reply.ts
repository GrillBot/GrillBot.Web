import { AutoReplyItemFlags } from './enums/auto-reply-item-flags';

export class AutoReplyItem {
    public id: number;
    public template: string;
    public reply: string;
    public flags: AutoReplyItemFlags = 0;

    get isDisabled(): boolean { return (this.flags & AutoReplyItemFlags.Disabled) != 0; }
    get caseSensitive(): boolean { return (this.flags & AutoReplyItemFlags.CaseSensitive) != 0; }

    static create(data: any): AutoReplyItem | null {
        if (!data) { return null; }
        const item = new AutoReplyItem();

        item.flags = data.flags;
        item.id = data.id;
        item.reply = data.reply;
        item.template = data.template;

        return item;
    }
}

export class AutoReplyItemParams {
    public template: string;
    public reply: string;
    public flags: AutoReplyItemFlags = 0;

    static get empty(): AutoReplyItemParams { return new AutoReplyItemParams(); }

    static create(form: any): AutoReplyItemParams {
        const params = new AutoReplyItemParams();

        params.template = form.template;
        params.reply = form.reply;
        params.flags = form.flags;

        return params;
    }
}
