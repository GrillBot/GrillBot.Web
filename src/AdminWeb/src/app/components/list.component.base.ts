import { Directive, viewChild } from "@angular/core";
import { PaginatedGridComponent } from "./paginated-grid/paginated-grid.component";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { PaginatedResponse, RawHttpResponse, SortParameters } from "../core/models/common";
import * as rxjs from 'rxjs';

@Directive()
export abstract class ListBaseComponent<TFilter, TResponse> {
  grid = viewChild<PaginatedGridComponent>('grid');

  gridOptions = this.createGridOptions();
  filter!: TFilter;

  onFilterChanged(filter: TFilter) {
    this.filter = filter;
    this.reload();
  }

  reload(): void {
    this.grid()?.loadData(
      this.filter,
      request => this.createRequest(request).pipe(
        rxjs.filter(res => res.type === 'finish'),
        rxjs.map(res => res.value!)
      ),
      this.createDefaultSort()
    );
  }

  abstract createGridOptions(): GridOptions;
  abstract createRequest(request: any): Observable<RawHttpResponse<PaginatedResponse<TResponse>>>;
  abstract createDefaultSort(): SortParameters;
}
