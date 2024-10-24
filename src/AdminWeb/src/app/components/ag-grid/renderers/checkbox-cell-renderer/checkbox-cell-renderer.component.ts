import { Component, signal } from "@angular/core";
import { FormCheckInputDirective } from "@coreui/angular";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  template: '<input cFormCheckInput disabled [checked]="value()" [id]="checkboxId()" />',
  standalone: true,
  imports: [
    FormCheckInputDirective
  ],
  styles: [
    'input:disabled { opacity: 1 !important }'
  ]
})
export class CheckboxCellRenderer implements ICellRendererAngularComp {
  value = signal(false);
  checkboxId = signal('');

  agInit(params: ICellRendererParams<any, boolean, any>): void {
    this.value.set(params.value ?? false);
    this.checkboxId.set(params.column?.getId() + '-' + params.node.id);
  }

  refresh(params: ICellRendererParams<any, boolean, any>): boolean {
    this.value.set(params.value ?? false);
    return true;
  }

}
