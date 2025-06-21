import { Component, inject } from "@angular/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { ButtonDef } from "./buttons-cell-renderer.models";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ButtonDirective, Colors } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { VisibilityDirective } from "../../../../core/directives";
import { Router } from "@angular/router";

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
  readonly #router = inject(Router);

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

  getButtonColor(button: ButtonDef, row: any): Colors {
    const color = typeof button.color === 'function' ? button.color(row) : button.color;
    return color ?? 'transparent';
  }

  getButtonTitle(button: ButtonDef, row: any): string | undefined {
    return typeof button.title === 'function' ? button.title(row) : button.title;
  }

  buttonClick(def: ButtonDef, row: any): void {
    if (def.action) {
      def.action(row);
    } else if (def.redirectTo) {
      const redirectUri = typeof def.redirectTo === 'function' ? def.redirectTo(row) : def.redirectTo;
      this.#router.navigate([redirectUri]);
    }
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
