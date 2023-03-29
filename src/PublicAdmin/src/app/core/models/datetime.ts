import * as Moment from 'moment';

export type DateTimeCompareResult = 'now' | 'before' | 'after';

export class DateTime {
    constructor(public moment: Moment.Moment) { }

    static get now(): DateTime {
        return new DateTime(Moment());
    }

    get binding(): string {
        return this.toLocaleString();
    }

    static fromFormatedString(datetime: string, format: string | string[]): DateTime {
        const moment = Moment(datetime, format);

        if (!moment.isValid()) {
            throw new Error(`Datetime '${datetime}' is not valid.`);
        }

        return new DateTime(moment);
    }

    static fromISOString(datetime: string): DateTime {
        const moment = Moment(datetime);

        if (!moment.isValid()) {
            throw new Error('Datetime is not valid ISO string.');
        }

        return new DateTime(moment);
    }

    compare(datetime: DateTime): DateTimeCompareResult {
        if (this.moment.isSame(datetime.moment)) { return 'now'; }
        return this.moment.isBefore(datetime.moment) ? 'before' : 'after';
    }

    compareWithNow(): DateTimeCompareResult {
        return this.compare(DateTime.now);
    }

    toLocaleString(): string {
        return this.moment.locale('cs').format('L LTS');
    }

    getTime(): number { return this.moment.unix(); }

    toISOString(keepOffset: boolean = true): string {
        return this.moment.toISOString(keepOffset);
    }

    toFormString(onlyDate: boolean): string {
        return this.moment.format(onlyDate ? 'YYYY-MM-DD' : 'YYYY-MM-DDTHH:mm');
    }
}
