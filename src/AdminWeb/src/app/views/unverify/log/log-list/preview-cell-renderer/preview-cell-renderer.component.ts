import { ICellRendererAngularComp } from "ag-grid-angular";
import { UnverifyOperationType } from "../../../../../core/enums/unverify-operation-type";
import { ICellRendererParams } from "ag-grid-community";
import { Component } from "@angular/core";
import { UnverifyPreviewComponent } from "./unverify-preview/unverify-preview.component";
import { SelfunverifyPreviewComponent } from "./selfunverify-preview/selfunverify-preview.component";
import { AutoremovePreviewComponent } from "./autoremove-preview/autoremove-preview.component";
import { ManualremovePreviewComponent } from "./manualremove-preview/manualremove-preview.component";
import { UpdatePreviewComponent } from "./update-preview/update-preview.component";
import { RecoveryPreviewComponent } from "./recovery-preview/recovery-preview.component";

@Component({
  templateUrl: './preview-cell-renderer.component.html',
  standalone: true,
  imports: [
    UnverifyPreviewComponent,
    SelfunverifyPreviewComponent,
    AutoremovePreviewComponent,
    ManualremovePreviewComponent,
    UpdatePreviewComponent,
    RecoveryPreviewComponent
  ]
})
export class PreviewCellRendererComponent implements ICellRendererAngularComp {
  preview!: any;
  type!: UnverifyOperationType;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.preview = params.value;
    this.type = params.data.type;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.preview = params.value;
    this.type = params.data.type;

    return true;
  }

}
