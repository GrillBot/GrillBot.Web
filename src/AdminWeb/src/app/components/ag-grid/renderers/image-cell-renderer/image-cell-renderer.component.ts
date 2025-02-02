import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

export type ImageCellRendererParams = ICellRendererParams & {
  width: number,
  height: number,
  alt: string
}

@Component({
  templateUrl: './image-cell-renderer.component.html',
  standalone: true
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
  params!: ImageCellRendererParams | null;

  agInit(params: ImageCellRendererParams): void {
    this.params = params;
  }

  refresh(params: ImageCellRendererParams): boolean {
    this.params = null;
    this.params = params;

    return true;
  }
}
