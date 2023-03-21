import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'czechBooleanPipe'
})
export class CzechBooleanPipePipe implements PipeTransform {
    transform(value: boolean, ...args: any[]): string {
        return value ? 'Ano' : 'Ne';
    }
}
