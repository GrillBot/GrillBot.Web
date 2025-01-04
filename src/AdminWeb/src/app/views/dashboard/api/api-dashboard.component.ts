import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { AuditLogClient } from "../../../core/clients/audit-log.client";
import { map } from "rxjs";
import { GridOptions } from "ag-grid-community";
import { AgGridComponent, COLUMN_FILTERS, STRIPED_ROW_STYLE } from "../../../components";

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    AgGridComponent
  ]
})
export class ApiDashboardComponent implements OnInit {
  readonly #client = inject(AuditLogClient);
  readonly $publicApiDashboard = this.#client.getApiDashboard('V2').pipe(map(o => o.value!));
  readonly $privateApiDashboard = this.#client.getApiDashboard('V3').pipe(map(o => o.value!));

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'name',
          headerName: 'Endpoint',
          tooltipField: 'name',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'result',
          headerName: 'Výsledek',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'duration',
          headerName: 'Trvání',
          cellDataType: 'duration',
          maxWidth: 140,
          filter: COLUMN_FILTERS.NUMBER
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
