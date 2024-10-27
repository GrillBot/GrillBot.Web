import { Directive, viewChild } from "@angular/core";
import { PaginatedGridComponent } from "./paginated-grid/paginated-grid.component";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { PaginatedResponse, RawHttpResponse, SortParameters, WithSortAndPagination } from "../core/models/common";
import * as rxjs from 'rxjs';
import { ModalComponent } from "@coreui/angular";

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

  openModal(
    modal?: ModalComponent,
    beforeOpen: (() => void) | null = null,
    afterClose: (() => void) | null = null
  ) {
    if (!modal) {
      return;
    }

    if (beforeOpen) {
      beforeOpen();
    }

    modal.visible = true;

    if (afterClose) {
      const visibleChange = modal.visibleChange
        .pipe(rxjs.filter(visible => !visible))
        .subscribe(() => {
          afterClose();
          visibleChange.unsubscribe();
        })
    }
  }

  abstract createGridOptions(): GridOptions;
  abstract createRequest(request: WithSortAndPagination<TFilter>): Observable<RawHttpResponse<PaginatedResponse<TResponse>>>;
  abstract createDefaultSort(): SortParameters;
}
