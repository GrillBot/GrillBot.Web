import { ControlValueAccessor, FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "../../../../core/models/common";
import { inject } from "@angular/core";

export abstract class AdvancedFilterBase<TAdvancedFilter> implements ControlValueAccessor {
  protected readonly formBuilder = inject(FormBuilder);

  form!: FormGroup<IForm<TAdvancedFilter>>;

  constructor() {
    this.form = this.formBuilder.group(this.createForm());
  }

  abstract writeValue(obj: TAdvancedFilter | null): void;
  abstract createForm(): IForm<TAdvancedFilter>;

  registerOnChange(fn: (_: any) => void): void {
    this.form.valueChanges.subscribe(val => fn(this.transform(val as TAdvancedFilter)));
  }

  registerOnTouched(fn: () => void): void {
    this.form.valueChanges.subscribe(_ => fn());
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  protected transform(value: TAdvancedFilter): TAdvancedFilter {
    return value;
  }
}
