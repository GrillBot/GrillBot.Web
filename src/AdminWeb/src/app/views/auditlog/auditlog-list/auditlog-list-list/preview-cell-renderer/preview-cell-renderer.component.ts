import { ICellRendererParams } from 'ag-grid-community';
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  templateUrl: './preview-cell-renderer.component.html',
  standalone: true,
  imports: [
  ]
})
export class PreviewCellRendererComponent implements ICellRendererAngularComp {
  preview!: any;

  agInit(params: ICellRendererParams): void {
    this.preview = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.preview = params.value;
    return true;
  }
}
