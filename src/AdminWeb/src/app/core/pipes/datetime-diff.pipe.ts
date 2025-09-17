import { Pipe, PipeTransform } from "@angular/core";
import { DateTime } from "luxon";

@Pipe({
  name: 'datetimeDiff',
  standalone: true
})
export class DatetimeDiffPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const startDateTime = this.parseDateTime(value);
    const endDateTime = args.length > 0 ? this.parseDateTime(args[0]) : DateTime.now();

    return endDateTime.diff(startDateTime).toMillis();
  }

  private parseDateTime(value: any): DateTime {
    if (value instanceof DateTime) {
      return value;
    }
    else if (value instanceof Date) {
      return DateTime.fromJSDate(value);
    } else if (typeof value === 'string') {
      if (value === 'now') {
        return DateTime.now();
      }

      return DateTime.fromISO(value);
    }

    throw new Error('Unsupported date time format');
  }
}
