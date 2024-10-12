import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'spacedNumber',
  standalone: true
})
export class SpacedNumberPipe implements PipeTransform {
  transform(value: number | string | null, ...args: any[]): string {
    const defaultValue = args[0] ?? '';
    if (value === undefined || value === null) {
      return defaultValue;
    }

    let valueNumber = 0;

    if (typeof value === 'number' || typeof value === 'bigint') {
      valueNumber = value as number;
    } else if (typeof value === 'string') {
      valueNumber = value.includes('.') || value.includes(',') ? parseFloat(value) : parseInt(value, 10);

      if (isNaN(valueNumber)) {
        console.warn(`Unexpected input (${value}). Expected number of number as string. Skipping transformation.`);
        return value.toString();
      }
    } else {
      console.warn(`Unexpected input (${value}). Expected number of number as string. Skipping transformation.`);
      return String(value);
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
