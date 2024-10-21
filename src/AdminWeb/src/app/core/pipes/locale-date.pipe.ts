import { DatePipe } from "@angular/common";
import { inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'localeDatePipe',
  standalone: true
})
export class LocaleDatePipe implements PipeTransform {
  readonly #LOCALE_ID = inject(LOCALE_ID);

  transform(value: string, ...args: any[]): string {
    const format = args[0] ?? 'dd. MM. yyyy HH:mm:ss';
    return LocaleDatePipe.transformValue(value, format, this.#LOCALE_ID);
  }

  static transformValue(value: string, format: string, localeId: string): string {
    return new DatePipe(localeId).transform(value, format) ?? value;
  }
}
