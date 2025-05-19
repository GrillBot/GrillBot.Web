import { Component, computed, forwardRef, inject, input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidatorFn } from "@angular/forms";
import { FormControlDirective, FormLabelDirective } from "@coreui/angular";
import { ValidationErrorsComponent } from "../validation-errors/validation-errors.component";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormLabelDirective,
    FormControlDirective,
    ValidationErrorsComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  readonly #formBuilder = inject(FormBuilder);

  label = input.required<string>();
  validators = input<ValidatorFn | ValidatorFn[] | null>();
  sizing = input<'sm' | 'lg' | ''>();
  autocomplete = input<boolean>(true);

  formControl = computed(() =>
    this.#formBuilder.control<string | null>(null, { validators: this.validators() })
  );

  hasValidations = computed(() => {
    if (!this.validators()) {
      return false;
    }

    return Array.isArray(this.validators()) ? this.validators()!.length > 0 : true;
  });

  writeValue(obj: string | any): void {
    this.formControl().patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: (val: string | null) => void): void {
    this.formControl().valueChanges.subscribe(val => fn(val?.length == 0 ? null : val));
  }

  registerOnTouched(fn: () => void): void {
    this.formControl().statusChanges.subscribe(_ => fn());
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl().disable();
    } else {
      this.formControl().enable();
    }
  }
}
