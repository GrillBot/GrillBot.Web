import { ColDef, GridOptions, RowClassParams, RowStyle, ValueFormatterParams } from "ag-grid-community";
import { LoadingOverlayComponent } from "./overlays/loading-overlay/loading-overlay.component";

export const DEFAULT_COL_DEF: ColDef<any, any> = {
  sortable: false,
  autoHeight: true,
  resizable: false,
  rowDrag: false,
  suppressMovable: true,
  editable: false,
  headerClass: () => ['text-dark'],
  autoHeaderHeight: true,
  cellStyle: {
    'padding': '0.25rem 0.25rem',
    'padding-left': 'calc(var(--ag-cell-horizontal-padding) - 1px + var(--ag-row-group-indent-size) * var(--ag-indentation-level))'
  }
};

export const DEFAULT_GRID_OPTIONS: GridOptions = {
  autoSizeStrategy: {
    type: 'fitGridWidth'
  },
  loadingOverlayComponent: LoadingOverlayComponent,
  loadingOverlayComponentParams: {
    showText: false
  },
  suppressRowHoverHighlight: true
}

export const INDEX_COLUMN: ColDef = {
  valueFormatter: (params: ValueFormatterParams) => params.node ? `${(params.node?.rowIndex ?? 0) + 1}.` : '',
  maxWidth: 50,
};

export const STRIPED_ROW_STYLE: (params: RowClassParams<any>) => RowStyle | undefined = params => {
  return params.rowIndex % 2 === 0 ?
    { 'background-color': 'rgba(8, 10, 12, 0.05)' } :
    undefined;
};
