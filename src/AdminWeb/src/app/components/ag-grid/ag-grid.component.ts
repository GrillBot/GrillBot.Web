import { AsyncPipe, NgClass } from "@angular/common";
import { Component, computed, inject, input, output, Signal } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { Observable } from "rxjs";
import { LoadingOverlayComponent } from "./renderers/loading-overlay/loading-overlay.component";
import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
import { DEFAULT_CELL_PADDING } from "./ag-grid.defaults";
import { ColorModeService } from "@coreui/angular";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  standalone: true,
  imports: [
    AgGridAngular,
    AsyncPipe,
    NgClass
  ]
})
export class AgGridComponent {
  readonly #colorModeService = inject(ColorModeService);

  gridOptions = input.required<GridOptions>();
  dataSource = input.required<Observable<any>>();
  width = input<string>('100%');
  height = input<string>('450px');
  colorMode = this.#colorModeService.colorMode;

  onGridReady = output<GridReadyEvent<any, any>>();

  options: Signal<GridOptions> = computed(() => {
    return {
      autoSizeStrategy: {
        type: 'fitGridWidth'
      },
      loadingOverlayComponent: LoadingOverlayComponent,
      loadingOverlayComponentParams: {
        showText: false
      },
      suppressRowHoverHighlight: true,
      localeText: AG_GRID_LOCALE_CZ,
      columnDefs: [],
      defaultColDef: {
        sortable: false,
        autoHeight: true,
        resizable: false,
        rowDrag: false,
        suppressMovable: true,
        editable: false,
        headerClass: () => ['text-dark'],
        autoHeaderHeight: true,
        cellStyle: DEFAULT_CELL_PADDING
      },
      onGridReady: $event => {
        $event.api.autoSizeAllColumns();
        this.onGridReady.emit($event);
      },
      ...this.gridOptions(),
    };
  });
}
