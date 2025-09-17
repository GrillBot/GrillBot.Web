import { FormControlBase } from "../form-control.component.base";
import { Directive, HostBinding, HostListener } from "@angular/core";
import { DateTime } from "luxon";

@Directive({
  selector: 'input[datetime-picker]',
  standalone: true
})
export class DatetimePickerDirective extends FormControlBase<string> {
  @HostBinding('attr.type') type = 'datetime-local';
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  @HostBinding('attr.value')
  get _value() {
    return this.value();
  };

  @HostBinding('disabled') get _disabled() {
    return this.disabled();
  }

  @HostListener('input', ['$event'])
  override onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    const datetime = val.length === 0 ? null : DateTime.fromISO(val).toUTC().toISO();

    this.value.set(datetime);
    this.onChange(datetime);
  }

  @HostListener('blur')
  override onBlur(): void {
    this.onTouched();
  }
}
