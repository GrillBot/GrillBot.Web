import { Support } from '../lib/support';
import { DateTime } from './datetime';

export class Attachment {
    public name: string;
    public url: string;

    get extension(): string {
        return /(?:\.([^.]+))?$/.exec(this.name)[1];
    }

    get isImage(): boolean {
        return ['png', 'jpg', 'jpeg', 'gif', 'svg', 'apng', 'avif', 'webp'].includes(this.extension);
    }

    static create(data: any): Attachment {
        const attachment = new Attachment();

        attachment.name = data.name;
        attachment.url = data.url;

        return attachment;
    }
}

export class Pin {
    public author: string;
    public createdAt: DateTime;
    public jumpUrl: string;
    public content: string;
    public attachments: Attachment[];

    static create(data: any): Pin {
        const pin = new Pin();

        pin.author = data.author;
        pin.createdAt = DateTime.fromISOString(data.created_at);
        pin.jumpUrl = data.jump_url;
        pin.content = Support.isEmpty(data.content) ? null : data.content;
        pin.attachments = data.attachments.map((o: any) => Attachment.create(o));

        return pin;
    }
}

export class PinChannel {
    public channelName: string;
    public channelUrl: string;
    public pins: Pin[];

    static create(data: any): PinChannel {
        const channel = new PinChannel();

        channel.channelName = data.channel_name;
        channel.channelUrl = data.channel_url;
        channel.pins = data.pins.map((o: any) => Pin.create(o));

        return channel;
    }
}
