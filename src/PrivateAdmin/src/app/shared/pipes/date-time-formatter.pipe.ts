import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'src/app/core/models/datetime';

@Pipe({
    name: 'dateTimeFormatter'
})
export class DateTimeFormatterPipe implements PipeTransform {
    transform(value: string | DateTime, ...args: any[]): string {
        if (typeof value === 'string') {
            value = DateTime.fromISOString(value);
        }

        return value.binding;
    }

}
