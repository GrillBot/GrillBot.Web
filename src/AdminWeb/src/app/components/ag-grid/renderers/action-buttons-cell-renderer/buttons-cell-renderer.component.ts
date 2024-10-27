import { Component } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { ButtonDef } from "./buttons-cell-renderer.models";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { from } from 'typescript-extended-linq';
import { ButtonDirective } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { VisibilityDirective } from "../../../../core/directives";

export type ButtonsCellRendererParams = ICellRendererParams & {
  buttons: ButtonDef[];
}

@Component({
  templateUrl: './buttons-cell-renderer.component.html',
  standalone: true,
  imports: [
    ButtonDirective,
    IconDirective,
    VisibilityDirective
  ]
})
export class ButtonsCellRendererComponent implements ICellRendererAngularComp {
  buttons!: ButtonDef[];
  rowData!: any;

  agInit(params: ButtonsCellRendererParams): void {
    this.buttons = params.buttons;
    this.rowData = params.data;
  }

  refresh(params: ButtonsCellRendererParams): boolean {
    const oldButtons = from(this.buttons).select(o => o.id).orderBy(o => o).toArray();
    const newButtons = from(params.buttons).select(o => o.id).orderBy(o => o).toArray();

    if (from(oldButtons).sequenceEqual(newButtons)) {
      return false;
    }

    this.buttons = params.buttons;
    this.rowData = params.data;
    return true;
  }

}
