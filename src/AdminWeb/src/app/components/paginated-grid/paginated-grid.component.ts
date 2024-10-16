import { Component, computed, input, output, signal } from "@angular/core";
import { GridOptions, RowDataUpdatedEvent, SortChangedEvent } from "ag-grid-community";
import { AgGridComponent } from "../ag-grid/ag-grid.component";
import { concat, map, Observable, of, tap } from "rxjs";
import { PaginatedParams, SortParamters } from "../../core/models/common";
import { TSourceGenerator } from "./paginated-grid.models";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-paginated-grid',
  templateUrl: './paginated-grid.component.html',
  standalone: true,
  imports: [
    AgGridComponent,
    LoadingComponent
  ],
  styleUrl: './paginated-grid.component.scss'
})
export class PaginatedGridComponent {
  gridOptions = input.required<GridOptions>();
  width = input<string>('100%');
  height = input<string>('450px');

  rowsUpdated = output<RowDataUpdatedEvent>();
  reloadRequested = output();

  loading = signal(false);

  source$: Observable<any> = of(null);
  sorting?: SortParamters;

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

  loadData(
    filter: any,
    sourceGenerator: TSourceGenerator,
    defaultSort: SortParamters = {}
  ) {
    const pagination: PaginatedParams = {
      page: 0,
      pageSize: 25
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

  sortChanged(event: SortChangedEvent): void {
    console.log(event);
  }
}
