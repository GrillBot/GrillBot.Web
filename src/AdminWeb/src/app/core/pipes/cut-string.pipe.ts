import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'cutString',
  standalone: true
})
export class CutStringPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string | null {
    if (!value) {
      return null;
    }

    const maxLength = args[0] as number;
    const withoutDots = args[1] ?? false;
    const dotsPlaces = withoutDots ? 3 : 0;

    return value.length >= maxLength - dotsPlaces ?
      value.substring(0, maxLength - dotsPlaces) + (withoutDots ? '' : '...') :
      value;
  }
}
