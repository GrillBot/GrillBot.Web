import { Component } from "@angular/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ButtonComponent } from "../../../button/button.component";
import { ButtonDef } from "../../../button/button.models";

export type ButtonsCellRendererParams = ICellRendererParams & {
  buttons: ButtonDef[];
}

@Component({
  templateUrl: './buttons-cell-renderer.component.html',
  standalone: true,
  imports: [ButtonComponent]
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

  static createColumnDef(buttons: ButtonDef[], maxWidth?: number): ColDef {
    return {
      headerName: 'Akce',
      colId: 'actions',
      cellRenderer: ButtonsCellRendererComponent,
      cellRendererParams: { buttons },
      maxWidth: maxWidth
    };
  }
}
