import { DateTime } from './datetime';

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
