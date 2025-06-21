import { Component, computed, inject, input, output, signal } from "@angular/core";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import { AgGridComponent } from "../ag-grid/ag-grid.component";
import { concat, map, Observable, of, tap } from "rxjs";
import { PaginatedParams, SortParameters } from "../../core/models/common";
import { TSourceGenerator } from "./paginated-grid.models";
import { LoadingComponent } from "../loading/loading.component";
import {
  ColComponent, FormControlDirective, FormFloatingDirective, FormLabelDirective, FormSelectDirective, RowComponent
} from "@coreui/angular";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { PaginationComponent } from "../pagination/pagination.component";
import { mapSortEventToSortingParams } from "../../core/mappers/grid.mapper";
import { SpacedNumberPipe } from "../../core/pipes";
import { ButtonComponent } from "../button/button.component";
import { ButtonDef } from "../button/button.models";

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
    PaginationComponent,
    FormControlDirective,
    SpacedNumberPipe,
    ButtonComponent
  ],
  styleUrl: './paginated-grid.component.scss'
})
export class PaginatedGridComponent {
  readonly #formBuilder = inject(FormBuilder);

  gridOptions = input.required<GridOptions>();
  width = input<string>('100%');
  height = input<string>('450px');
  defaultPageSize = input(25);
  defaultPage = input(0);
  showTotalCount = input(true);
  singlePage = input(false);
  actionButtons = input<ButtonDef[]>([]);

  rowsUpdated = output<RowDataUpdatedEvent>();
  reloadRequested = output();
  selectedRowsChanged = output<any[]>();

  loading = signal(false);
  selectedRows = signal<any>([]);

  source$: Observable<any> = of(null);
  sorting?: SortParameters;
  pagination?: PaginatedParams;
  itemsCount: number = 0;

  pageSize = this.#formBuilder.control(this.defaultPageSize());
  currentPage = this.#formBuilder.control(this.defaultPage());

  gridConfiguration = computed(() => {
    return {
      suppressNoRowsOverlay: true,
      onSortChanged: $event => {
        this.sorting = mapSortEventToSortingParams($event);
        this.reloadRequested.emit();
      },
      ...this.gridOptions()
    } as GridOptions;
  });

  constructor() {
    this.pageSize.valueChanges
      .subscribe(_ => this.reloadRequested.emit());

    this.currentPage.valueChanges
      .subscribe(_ => this.reloadRequested.emit());

    this.selectedRowsChanged
      .subscribe((rows: any[]) => this.selectedRows.set(rows));
  }

  loadData(
    filter: any,
    sourceGenerator: TSourceGenerator,
    defaultSort: SortParameters = {}
  ) {
    const pagination = {
      page: this.singlePage() ? 1 : (this.currentPage.value ?? this.defaultPage()),
      pageSize: this.singlePage() ? 2147483647 : (this.pageSize.value ?? this.defaultPageSize())
    };

    const sort = this.sorting ?? defaultSort;
    this.loading.set(true);

    this.source$ = concat(
      of([]),
      sourceGenerator({ pagination, sort, ...filter }).pipe(
        tap(data => {
          this.itemsCount = data.totalItemsCount;
        }),
        map(res => res.data),
        tap(_ => {
          this.loading.set(false);
        })
      )
    );
  }
}
