import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogClient } from "../../../core/clients/audit-log.client";
import { map } from "rxjs";
import { TimeSpanPipe } from "../../../core/pipes";
import { GridOptions } from "ag-grid-community";
import { AgGridComponent, COLUMN_FILTERS, LoadingComponent, STRIPED_ROW_STYLE, usePipeTransform } from "../../../components";

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  standalone: true,
  imports: [
    LoadingComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    IconDirective,
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
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 140,
          filter: COLUMN_FILTERS.NUMBER
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
