import { Observable } from "rxjs";
import { RawHttpResponse } from "../../core/models/common";
import { Signal } from "@angular/core";

export interface ColumnDef {
  headerText?: string;
  headerTemplate?: any;
  headerClasses?: string[];
  width?: number;
  dataClasses?: string[];
  valueFormatter?: (value: any) => Observable<string>;
}

export interface TableDef {
  /**
   * @default true
   */
  hover?: boolean;

  /**
   * @default true
   */
  responsive?: boolean;

  /**
   * @default false
   */
  striped?: boolean;

  /**
   * @default false
   */
  small?: boolean;

  tableClasses?: string[];
}

export interface SimpleDataTableDefs<TData = any> {
  dataSource: TData[] | Observable<RawHttpResponse<TData[]>>;
  columns: { [field: string]: ColumnDef };
  table?: TableDef;
}
