import { PipeTransform } from "@angular/core";
import { ValueFormatterParams } from "ag-grid-community";

export function usePipeTransform<TPipe extends PipeTransform>(
  params: ValueFormatterParams<any, any>,
  pipeType: new () => TPipe,
  ...pipeArgs: any[]
): string {
  return new pipeType().transform(params.value, ...pipeArgs);
}
