import { Directive, input, isDevMode, Optional, Self, signal } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn } from "@angular/forms";

@Directive({
  standalone: true
})
export abstract class FormControlBase<TValue> implements ControlValueAccessor {
  validators = input<ValidatorFn | ValidatorFn[] | null>();

  value = signal<TValue | null>(null);
  disabled = signal<boolean>(false);

  get controlClasses() {
    const control = this.ngControl.control;

    return {
      'ng-touched': control?.touched,
      'ng-untouched': control && !control.touched,
      'ng-dirty': control?.dirty,
      'ng-pristine': control && !control.dirty,
      'ng-valid': control?.valid,
      'ng-invalid': control && !control.valid,
    }
  }

  protected onChange: (val: TValue | null) => void = () => { };
  protected onTouched: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: TValue | any): void {
    this.value.set(obj ?? null);

    if (isDevMode()) {
      console.trace(obj);
    }
  }

  registerOnChange(fn: (val: TValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  abstract onInput(event: Event): void;
  abstract onBlur(): void;
}
