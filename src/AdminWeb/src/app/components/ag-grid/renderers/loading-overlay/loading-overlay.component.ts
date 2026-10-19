import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ILoadingOverlayAngularComp } from "ag-grid-angular";
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
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    LoadingComponent
  ]
})
export class LoadingOverlayComponent implements ILoadingOverlayAngularComp {
  params!: LoadingOverlayParams;

  agInit(params: LoadingOverlayParams): void {
    this.params = params;
  }
}
