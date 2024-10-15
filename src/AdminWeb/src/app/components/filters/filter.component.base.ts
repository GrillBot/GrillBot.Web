import { Directive, inject, isDevMode, output } from "@angular/core";
import { AbstractControlOptions, FormControl, FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { LocalStorageService } from "@coreui/angular";
import { IForm } from "../../core/models/common";
import { debounceTime } from "rxjs";

type FormControlValueTypes = string | number | boolean | null;

@Directive()
export abstract class FilterBaseComponent<TFilter extends {} = any> {
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #storage = inject(LocalStorageService);

  filterId: string | null = null;
  autoSubmit = true;
  form: FormGroup<IForm<TFilter>>;
  debounceTime = 500;

  filterEvent = output<TFilter>();

  get filterIdValue(): string | null {
    return this.filterId ? `X-GrillBot-${this.filterId}` : null;
  }

  constructor() {
    this.configure();

    this.form = this.#formBuilder.group<IForm<TFilter>>(this.createForm());
    this.fillFormFromStorage();

    if (this.autoSubmit) {
      this.form.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe(_ => this.submitForm());
    }

    this.submitForm();
  }

  abstract configure(): void;
  abstract createForm(): IForm<TFilter>;

  createControl(
    options: AbstractControlOptions | null = null,
    defaultValue: FormControlValueTypes = null
  ): FormControl<FormControlValueTypes> {
    return this.#formBuilder.control(defaultValue, options);
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const filter = this.form.value as TFilter;

    if (isDevMode()) {
      console.log(
        this.filterIdValue ? `Executing filter ${this.filterIdValue}` : 'Executing unsaved filter',
        filter
      );
    }

    this.filterEvent.emit(filter);
    if (this.filterIdValue) {
      this.#storage.setItem(this.filterIdValue, filter);
    }
  }

  resetFilter(): void {
    const defaultFilter = this.createForm();
    const defaultValues = Object.keys(defaultFilter).map(k => {
      const value = ((defaultFilter as any)[k] as FormControl<FormControlValueTypes>).value;
      return [k, value];
    });

    this.form.patchValue(Object.fromEntries(defaultValues));
  }

  private fillFormFromStorage(): void {
    if (!this.filterIdValue) {
      return;
    }

    const storageData = this.#storage.getItem(this.filterIdValue) as TFilter;
    if (storageData) {
      this.form.patchValue(storageData);
    }
  }
}
