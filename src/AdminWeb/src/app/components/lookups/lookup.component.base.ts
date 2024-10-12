import { Directive, inject } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl } from "@angular/forms";

@Directive()
export abstract class LookupBaseComponent<T> implements ControlValueAccessor {
  readonly #formBuilder = inject(FormBuilder);

  formControl: FormControl<T | null>;

  constructor() {
    this.formControl = this.#formBuilder.control(null);
  }

  writeValue(obj: T | any): void {
    this.formControl.patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: (_: T | null) => void): void {
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
