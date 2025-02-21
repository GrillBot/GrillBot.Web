import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { AlertComponent, ButtonDirective } from "@coreui/angular";
import { FiltersClient } from "../../../core/clients/filters.client";
import { FormGroup } from "@angular/forms";
import { IconDirective } from "@coreui/icons-angular";
import { LoadingComponent } from "../../loading/loading.component";
import { LocaleDatePipe } from "../../../core/pipes";
import { catchError, debounceTime, EMPTY } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { mapHttpErrors } from "../../../core/mappers";

type State = 'not-started' | 'creating' | 'created' | 'failed';

@Component({
  selector: 'app-filter-store',
  templateUrl: './filter-store.component.html',
  standalone: true,
  imports: [
    ButtonDirective,
    IconDirective,
    AlertComponent,
    LoadingComponent,
    LocaleDatePipe
  ]
})
export class FilterStoreComponent implements OnInit {
  readonly #client = inject(FiltersClient);

  form = input.required<FormGroup<any>>();
  state = signal<State>('not-started');
  errorMessage = signal<string | null>(null);
  address = signal<string | null>(null);
  validTo = signal<string>('');

  stateColor = computed(() => {
    switch (this.state()) {
      case 'created': return 'success';
      case 'failed': return 'danger';
      case 'creating': return 'primary';
      default: return 'transparent';
    }
  });

  ngOnInit(): void {
    this.form().valueChanges.subscribe(() => {
      this.state.set('not-started');
      this.errorMessage.set(null);
      this.address.set(null);
      this.validTo.set('');
    });
  }

  storeFilter() {
    // TODO Handle invalid and empty/default filters.

    this.state.set('creating');

    const filterJson = JSON.stringify(this.form().value);
    this.#client.storeFilter(filterJson).pipe(
      debounceTime(100),
      catchError((err: HttpErrorResponse) => {
        this.errorMessage.set([...new Set(mapHttpErrors(err))].join('; '));
        this.state.set('failed');

        return EMPTY;
      })
    ).subscribe(data => {
      if (data.type === 'start') {
        this.state.set('creating');
        return;
      }

      if (!data.value) {
        this.errorMessage.set('Nepodařilo se zpracovat požadavek. Vyzkoušej to znovu později.');
        this.state.set('failed');

        return;
      }

      this.validTo.set(data.value.expiresAtUtc);

      const url = new URL(location.href);
      url.searchParams.set('filterId', data.value.id);

      this.address.set(url.toString());
      this.state.set('created');
    });
  }
}
