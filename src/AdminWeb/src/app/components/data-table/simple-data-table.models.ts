import { Observable } from "rxjs";
import { RawHttpResponse } from "../../core/models/common";
import { TemplateRef } from "@angular/core";

export interface ColumnCollectionDef {
  [field: string]: ColumnDef
}

export interface ColumnDef {
  headerText?: string;
  headerTemplate?: any;
  headerClasses?: string[];
  width?: number;
  dataClasses?: string[];
  valueFormatter?: (value: any) => Observable<string | TemplateRef<HTMLElement>>;
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
  columns: ColumnCollectionDef;
  table?: TableDef;
}
