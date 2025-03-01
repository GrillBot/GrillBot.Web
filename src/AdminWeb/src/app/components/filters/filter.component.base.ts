import { Directive, inject, isDevMode, OnInit, output } from "@angular/core";
import { AbstractControlOptions, FormControl, FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { LocalStorageService } from "@coreui/angular";
import { IForm } from "../../core/models/common";
import { catchError, debounceTime, EMPTY, filter } from "rxjs";
import { Router } from "@angular/router";
import { mapQueryParamsFromSnapshot } from "../../core/mappers/router.mapper";
import { NotificationsManager } from "../../core/managers/notifications.manager";
import { FiltersClient } from "../../core/clients/filters.client";

@Directive()
export abstract class FilterBaseComponent<TFilter extends {} = any> implements OnInit {
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #storage = inject(LocalStorageService);
  readonly #router = inject(Router);
  readonly #notifications = inject(NotificationsManager);
  readonly #filterStoreClient = inject(FiltersClient);

  filterId: string | null = null;
  autoSubmit = true;
  form: FormGroup<IForm<TFilter>>;
  debounceTime = 300;

  filterEvent = output<TFilter>();

  get filterIdValue(): string | null {
    return this.filterId ? `X-GrillBot-${this.filterId}` : null;
  }

  constructor() {
    this.configure();
    this.form = this.#formBuilder.group<IForm<TFilter>>(this.createForm());

    if (this.autoSubmit) {
      this.form.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe(_ => this.submitForm());
    }
  }

  ngOnInit(): void {
    this.fillForm();
  }

  abstract configure(): void;
  abstract createForm(): IForm<TFilter>;

  createControl(
    options: AbstractControlOptions | null = null,
    defaultValue: any = null
  ): FormControl<any> {
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
      const value = ((defaultFilter as any)[k] as FormControl<any>).value;
      return [k, value];
    });

    this.form.patchValue(Object.fromEntries(defaultValues));
  }

  private fillForm(): void {
    const routeSnapshot = this.#router.routerState.snapshot.root;
    const queryParams = mapQueryParamsFromSnapshot(routeSnapshot);
    const filterId = queryParams['filterId'] as string;
    const filterFields = Object.fromEntries(
      Object.keys(queryParams)
        .filter(o => o.startsWith('filter.'))
        .map(k => [
          k.replace('filter.', ''),
          queryParams[k]
        ])
    );

    if (isDevMode()) {
      console.log('Loaded filterId', `'${filterId}'`);
      console.log('Filter fields', filterFields);
    }

    if ((filterId && filterId.length > 0) && Object.keys(filterFields).length > 0) {
      this.#notifications.pushNotification(
        'Kombinace uloženého pohledu ("filterId") a filtrů v adrese není povolena. ' +
        'Byl použit poslední platný filtr. Uprav adresu a zkus to znovu.',
        false
      );

      this.fillFormFromStorage();
      return;
    }

    if (filterId && filterId.length > 0) {
      this.fillFormFromFilterId(filterId);
      return;
    }

    if (Object.keys(filterFields).length > 0) {
      this.form.patchValue(filterFields as TFilter);
      return;
    }

    this.fillFormFromStorage();
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

  private fillFormFromFilterId(filterId: string): void {
    this.#filterStoreClient.getFilter(filterId).pipe(
      filter(data => data.type === 'finish'),
      catchError(_ => {
        this.filterLoadFailed();
        return EMPTY;
      })
    ).subscribe(filter => {
      if (!filter.value) {
        this.filterLoadFailed();
      } else {
        if (isDevMode()) {
          console.log('Successfully loaded stored filter', filter.value);
        }

        this.form.patchValue(filter.value as TFilter);
      }
    });
  }

  private filterLoadFailed(): void {
    this.#notifications.pushNotification('Bohužel se nepodařilo načíst zadaný pohled. Bude načten poslední platný pohled.', false);
    this.fillFormFromStorage();
  }
}
