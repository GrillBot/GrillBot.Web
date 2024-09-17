import { Component } from "@angular/core";
import { ILoadingCellRendererAngularComp } from "ag-grid-angular";
import { ILoadingOverlayParams } from "ag-grid-community";
import { LoadingComponent } from "../../../loading/loading.component";

export type LoadingOverlayParams = ILoadingOverlayParams & {
  customText?: string;
  showText?: boolean;
  visible?: boolean;
  small?: boolean;
}

@Component({
  templateUrl: './loading-overlay.component.html',
  standalone: true,
  imports: [
    LoadingComponent
  ]
})
export class LoadingOverlayComponent implements ILoadingCellRendererAngularComp {
  params!: LoadingOverlayParams;

  agInit(params: LoadingOverlayParams): void {
    this.params = params;
  }
}
