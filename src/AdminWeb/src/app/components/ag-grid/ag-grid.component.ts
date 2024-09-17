import { AsyncPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  standalone: true,
  imports: [
    AgGridAngular,
    AsyncPipe
  ]
})
export class AgGridComponent {
  gridOptions = input.required<GridOptions>();
  dataSource = input.required<Observable<any>>();
  width = input<string>('100%');
  height = input<string>('450px');
}
