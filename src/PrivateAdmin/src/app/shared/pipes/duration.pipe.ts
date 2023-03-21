import { DateTime } from './../../core/models/datetime';
import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: any, ...args: any[]): number {
        if (!args && args.length < 1) {
            throw new Error('Missing required start argument.');
        }

        const end = typeof value === 'string' ? DateTime.fromISOString(value) : value as DateTime;
        const start = typeof args[0] === 'string' ? DateTime.fromISOString(args[0]) : args[0] as DateTime;

        return Moment.duration(end.moment.diff(start.moment)).asMilliseconds();
    }
}
