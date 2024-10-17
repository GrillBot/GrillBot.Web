import { Component, computed, inject, input, output, signal } from "@angular/core";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import { AgGridComponent } from "../ag-grid/ag-grid.component";
import { concat, filter, map, Observable, of, tap } from "rxjs";
import { PaginatedParams, SortParamters } from "../../core/models/common";
import { TSourceGenerator } from "./paginated-grid.models";
import { LoadingComponent } from "../loading/loading.component";
import { ColComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, RowComponent } from "@coreui/angular";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-paginated-grid',
  templateUrl: './paginated-grid.component.html',
  standalone: true,
  imports: [
    AgGridComponent,
    LoadingComponent,
    RowComponent,
    ColComponent,
    FormFloatingDirective,
    FormSelectDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    IconDirective
  ],
  styleUrl: './paginated-grid.component.scss'
})
export class PaginatedGridComponent {
  readonly #formBuilder = inject(FormBuilder);

  gridOptions = input.required<GridOptions>();
  width = input<string>('100%');
  height = input<string>('450px');
  defaultPageSize = input(25);

  rowsUpdated = output<RowDataUpdatedEvent>();
  reloadRequested = output();

  loading = signal(false);

  source$: Observable<any> = of(null);
  sorting?: SortParamters;
  pagination?: PaginatedParams;

  pageSize = this.#formBuilder.control(this.defaultPageSize());

  gridConfiguration = computed(() => {
    return {
      suppressNoRowsOverlay: true,
      onSortChanged: $event => {
        const sortingColumn = $event.columns?.find(o => o.getSortIndex() !== null);
        if (!sortingColumn) {
          return;
        }

        this.sorting = {
          descending: sortingColumn.getSort() === "desc",
          orderBy: sortingColumn.getColId()
        };

        this.reloadRequested.emit();
      },
      ...this.gridOptions()
    } as GridOptions;
  });

  constructor() {
    this.pageSize.valueChanges
      .pipe(filter(pageSize => !!pageSize))
      .subscribe(pageSize => {
        this.pagination = {
          page: 0,
          pageSize: pageSize!
        };

        this.reloadRequested.emit();
      });
  }

  loadData(
    filter: any,
    sourceGenerator: TSourceGenerator,
    defaultSort: SortParamters = {}
  ) {
    const pagination = this.pagination ?? {
      page: 0,
      pageSize: this.defaultPageSize()
    };

    const sort = this.sorting ?? defaultSort;
    this.loading.set(true);

    const source = sourceGenerator({ pagination, sort, ...filter });

    this.source$ = concat(
      of([]),
      source.pipe(
        map(res => res.data),
        tap(_ => this.loading.set(false))
      )
    );
  }
}
