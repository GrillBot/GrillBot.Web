import { ColDef, RowClassParams, RowStyle, ValueFormatterParams } from "ag-grid-community";

export const DEFAULT_CELL_PADDING_LEFT = 'var(--ag-cell-horizontal-padding) - 1px + var(--ag-row-group-indent-size) * var(--ag-indentation-level)';

export const DEFAULT_CELL_PADDING = {
  'padding': '0.25rem 0.25rem',
  'padding-left': `calc(${DEFAULT_CELL_PADDING_LEFT})`
};

export const INDEX_COLUMN: ColDef = {
  valueFormatter: (params: ValueFormatterParams) => params.node ? `${(params.node?.rowIndex ?? 0) + 1}.` : '',
  maxWidth: 50,
};

export const STRIPED_ROW_STYLE: (params: RowClassParams<any>) => RowStyle | undefined = params => {
  return params.rowIndex % 2 === 0 ?
    { 'background-color': 'rgba(8, 10, 12, 0.05)' } :
    undefined;
};

export const COLUMN_FILTERS = {
  TEXT: 'agTextColumnFilter',
  NUMBER: 'agNumberColumnFilter',
  DATE: 'agDateColumnFilter'
}
