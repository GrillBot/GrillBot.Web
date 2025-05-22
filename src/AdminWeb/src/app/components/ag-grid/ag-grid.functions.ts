import { PipeTransform } from "@angular/core";
import { ColDef, ValueFormatterLiteParams, ValueFormatterParams } from "ag-grid-community";

function usePipeTransformInternal<TPipe extends PipeTransform>(
  value: any,
  pipeType: new () => TPipe,
  ...pipeArgs: any[]
): string {
  return new pipeType().transform(value, ...pipeArgs);
}

export function usePipeTransform<TPipe extends PipeTransform>(
  params: ValueFormatterParams<any, any>,
  pipeType: new () => TPipe,
  ...pipeArgs: any[]
): string {
  return usePipeTransformInternal(params.value, pipeType, ...pipeArgs);
}

export function useLitePipeTransform<TPipe extends PipeTransform>(
  params: ValueFormatterLiteParams<any, any>,
  pipeType: new () => TPipe,
  ...pipeArgs: any[]
): string {
  return usePipeTransformInternal(params.value, pipeType, ...pipeArgs);
}
