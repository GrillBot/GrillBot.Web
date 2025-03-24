import { Component } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { ButtonDef } from "./buttons-cell-renderer.models";
import { ICellRendererAngularComp } from "ag-grid-angular";
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
    const oldButtons = this.buttons.map(o => o.id).sort();
    const newButtons = params.buttons.map(o => o.id).sort();

    if (oldButtons.length === newButtons.length && oldButtons.every((val, index) => val === newButtons[index])) {
      return false;
    }

    this.buttons = params.buttons;
    this.rowData = params.data;
    return true;
  }

}
