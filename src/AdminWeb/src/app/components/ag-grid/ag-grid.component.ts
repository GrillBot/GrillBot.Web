import { AsyncPipe, NgClass } from "@angular/common";
import { Component, computed, inject, input, LOCALE_ID, output, Signal } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { CellClassParams, GridOptions, GridReadyEvent, RowDataUpdatedEvent } from "ag-grid-community";
import { Observable } from "rxjs";
import { LoadingOverlayComponent } from "./renderers/loading-overlay/loading-overlay.component";
import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
import { DEFAULT_CELL_PADDING } from "./ag-grid.defaults";
import { ColorModeService } from "@coreui/angular";
import { useLitePipeTransform } from "./ag-grid.functions";
import { LocaleDatePipe, SpacedNumberPipe, TimeSpanPipe } from "../../core/pipes";

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
  readonly #LOCALE_ID = inject(LOCALE_ID);

  gridOptions = input.required<GridOptions>();
  dataSource = input.required<Observable<any>>();
  width = input<string>('100%');
  height = input<string>('450px');
  colorMode = this.#colorModeService.colorMode;

  onGridReady = output<GridReadyEvent<any, any>>();
  rowsUpdated = output<RowDataUpdatedEvent>();
  selectedRowsChanged = output<any[]>();

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
      enableCellTextSelection: true,
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
        cellStyle: DEFAULT_CELL_PADDING,
        cellClass: params => this.getCellClass(params)
      },
      onGridReady: $event => {
        $event.api.autoSizeAllColumns();
        this.onGridReady.emit($event);
      },
      onRowDataUpdated: $event => {
        $event.api.autoSizeAllColumns();
        this.rowsUpdated.emit($event);
      },
      onRowSelected: $event => {
        const rows = $event.api.getSelectedRows();
        this.selectedRowsChanged.emit(rows);
      },
      dataTypeDefinitions: {
        duration: {
          extendsDataType: 'number',
          baseDataType: 'number',
          valueFormatter: params => useLitePipeTransform(params, TimeSpanPipe)
        },
        spacedNumber: {
          extendsDataType: 'number',
          baseDataType: 'number',
          valueFormatter: params => useLitePipeTransform(params, SpacedNumberPipe)
        },
        localeDatetime: {
          extendsDataType: 'text',
          baseDataType: 'text',
          valueFormatter: params => LocaleDatePipe.transformValue(params.value ?? '', 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID)
        }
      },
      ...this.gridOptions(),
    };
  });

  getCellClass(params: CellClassParams<any, any>): string[] | undefined {
    const indicateDeletion = (params.context?.indicateDeletion as boolean | undefined) ?? false;
    const indicateInvalid = (params.context?.indicateInvalid as boolean | undefined) ?? false;

    if (indicateDeletion && params.data.isDeleted) {
      return ['text-decoration-line-through', 'bg-danger-subtle'];
    }

    if (indicateInvalid && params.data.isInvalid) {
      return ['bg-warning-subtle'];
    }

    return undefined;
  }
}
