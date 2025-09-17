import { Component, input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormControlDirective, FormLabelDirective } from "@coreui/angular";
import { FormControlBase } from "../form-control.component.base";
import { DateTime } from "luxon";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  standalone: true,
  imports: [
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    NgClass
  ]
})
export class DatetimePickerComponent extends FormControlBase<string> {
  label = input<string | null>(null);
  sizing = input<'sm' | 'lg' | ''>();

  override onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    const datetime = val.length === 0 ? null : DateTime.fromISO(val).toUTC().toISO();

    this.value.set(datetime);
    this.onChange(datetime);
  }

  override onBlur(): void {
    this.onTouched();
  }
}
