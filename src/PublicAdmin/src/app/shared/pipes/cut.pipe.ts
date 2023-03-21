import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cut'
})
export class CutPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        if (!value) { return ''; }

        const length = args[0] as number;
        if (value.length >= length - 3) { return value.substring(0, length - 3) + '...'; }

        return value;
    }
}
