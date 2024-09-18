import { Pipe, PipeTransform } from "@angular/core";
import { Duration } from 'luxon';

@Pipe({
  name: 'timespan',
  standalone: true
})
export class TimeSpanPipe implements PipeTransform {
  transform(value: number, ..._: any[]): string {
    if (value < 0) {
      return '';
    } else if (value < 1000) {
      return `${value} ms`;
    }

    const duration = Duration.fromMillis(value).rescale();
    const days = Math.floor(duration.as('days'));
    const hours = String(duration.hours).padStart(2, '0');
    const minutes = String(duration.minutes).padStart(2, '0');
    const seconds = String(duration.seconds).padStart(2, '0');
    const miliseconds = ('.' + String(duration.milliseconds).padStart(3, '0')).replace('.000', '');

    return (days > 0 ? `${days}.` : '') + `${hours}:${minutes}:${seconds}${miliseconds}`;
  }
}
