import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberWithSpaces'
})
export class NumberWithSpacesPipe implements PipeTransform {
    transform(value: number | string, ...args: any[]): string {
        let valueNumber = 0;

        if (typeof value === 'number' || typeof value === 'bigint') {
            valueNumber = value as number;
        }
        else if (typeof value === 'string') {
            valueNumber = value.includes('.') || value.includes(',') ? parseFloat(value) : parseInt(value, 10);

            if (isNaN(valueNumber)) {
                throw new Error(`Unexpected input (${value}). Expected number or number as string.`);
            }
        } else {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Unexpected input (${value}). Expected number or number as string.`);
        }

        return valueNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
