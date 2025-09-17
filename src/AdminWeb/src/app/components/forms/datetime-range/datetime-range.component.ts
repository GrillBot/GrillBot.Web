import { Component, computed, forwardRef, inject, input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidatorFn } from "@angular/forms";
import { FormControlDirective, FormLabelDirective, InputGroupComponent } from "@coreui/angular";
import { DateTime } from "luxon";
import { DatetimePickerDirective } from "../datetime-picker/datetime-picker.directive";

export interface DateRange {
  from?: string;
  to?: string;
}

@Component({
  selector: 'app-datetime-range',
  templateUrl: 'datetime-range.component.html',
  standalone: true,
  imports: [
    FormControlDirective,
    FormLabelDirective,
    InputGroupComponent,
    ReactiveFormsModule,
    DatetimePickerDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeRangeComponent),
      multi: true
    }
  ]
})
export class DatetimeRangeComponent implements ControlValueAccessor {
  readonly #formBuilder = inject(FormBuilder);

  label = input.required<string>();
  validators = input<ValidatorFn | ValidatorFn[] | null>();
  sizing = input<string | 'sm' | 'lg' | ''>('');

  fromControl = computed(() =>
    this.#formBuilder.control<string | null>(null, { validators: this.validators() })
  );

  toControl = computed(() =>
    this.#formBuilder.control<string | null>(null, { validators: this.validators() })
  );

  hasValidations = computed(() => {
    if (!this.validators()) {
      return false;
    }

    return Array.isArray(this.validators()) ? this.validators()!.length > 0 : true;
  });

  writeValue(obj: DateRange | null): void {
    const localZone = DateTime.local().zone;

    if (obj?.from) {
      const from = DateTime.fromISO(obj.from).setZone(localZone).toISO({ includeOffset: false });
      this.fromControl().patchValue(from, { emitEvent: false });
    } else {
      this.fromControl().patchValue(null, { emitEvent: false });
    }

    if (obj?.to) {
      const to = DateTime.fromISO(obj.to).setZone(localZone).toISO({ includeOffset: false });
      this.toControl().patchValue(to, { emitEvent: false });
    } else {
      this.toControl().patchValue(null, { emitEvent: false });
    }
  }

  registerOnChange(fn: (val: DateRange | null) => void): void {
    this.fromControl().valueChanges.subscribe(_ => this.onChange(fn));
    this.toControl().valueChanges.subscribe(_ => this.onChange(fn));
  }

  registerOnTouched(fn: () => void): void {
    this.fromControl().statusChanges.subscribe(() => fn());
    this.toControl().statusChanges.subscribe(() => fn());
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.fromControl().disable();
      this.toControl().disable();
    } else {
      this.fromControl().enable();
      this.toControl().enable();
    }
  }

  private onChange(fn: (val: DateRange | null) => void): void {
    fn({
      from: this.fromControl().value as string ?? undefined,
      to: this.toControl().value as string ?? undefined
    });
  }
}
