import { Component, input, Optional, Self, signal } from "@angular/core";
import { ControlValueAccessor, NgControl, ReactiveFormsModule, ValidatorFn } from "@angular/forms";
import { FormControlDirective, FormLabelDirective } from "@coreui/angular";
import { ValidationErrorsComponent } from "../validation-errors/validation-errors.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormLabelDirective,
    FormControlDirective,
    ValidationErrorsComponent,
    NgClass
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  label = input.required<string>();
  validators = input<ValidatorFn | ValidatorFn[] | null>();
  sizing = input<'sm' | 'lg' | ''>();
  autocomplete = input<boolean>(true);
  multiline = input(false);

  value = signal<string | null>(null);
  disabled = signal<boolean>(false);

  get controlClasses() {
    const control = this.ngControl?.control;

    return {
      'ng-touched': control?.touched,
      'ng-untouched': control && !control.touched,
      'ng-dirty': control?.dirty,
      'ng-pristine': control && !control.dirty,
      'ng-valid': control?.valid,
      'ng-invalid': control && !control.valid,
    };
  };

  private onChange: (val: string | null) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: string | any): void {
    this.value.set(obj ?? null);
  }

  registerOnChange(fn: (val: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;

    this.value.set(val);
    this.onChange(val.length === 0 ? null : val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
