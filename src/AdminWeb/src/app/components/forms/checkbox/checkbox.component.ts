import { Component, forwardRef, inject, input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { FormCheckInputDirective, FormCheckLabelDirective } from "@coreui/angular";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormCheckInputDirective,
    FormCheckLabelDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements ControlValueAccessor {
  readonly #formBuilder = inject(FormBuilder);

  checkboxId = input.required<string>();
  label = input.required<string>();
  formControl = this.#formBuilder.control<boolean | null>(false);

  writeValue(obj: boolean): void {
    this.formControl.patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: (_: any) => void): void {
    this.formControl.valueChanges.subscribe(val => fn(val));
  }

  registerOnTouched(fn: () => void): void {
    this.formControl.statusChanges.subscribe(_ => fn());
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
