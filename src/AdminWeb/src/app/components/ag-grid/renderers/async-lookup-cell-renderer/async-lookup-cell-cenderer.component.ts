import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Observable } from "rxjs";
import { LoadingComponent } from "../../../loading/loading.component";

export type AsyncLookupCellRendererParams = ICellRendererParams & {
  sourceGenerator: (value: any) => Observable<any>;
}

@Component({
  templateUrl: './async-lookup-cell-cenderer.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent
  ]
})
export class AsyncLookupCellRendererComponent implements ICellRendererAngularComp {
  params!: AsyncLookupCellRendererParams | null;
  source!: Observable<any> | null;

  agInit(params: AsyncLookupCellRendererParams): void {
    this.params = params;
    this.source = params.sourceGenerator(params.value);
  }

  refresh(params: AsyncLookupCellRendererParams): boolean {
    this.params = null;
    this.source = null;

    this.params = params;
    this.source = params.sourceGenerator(params.value);

    return true;
  }
}
