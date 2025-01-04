import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { DashboardInfoRow } from "../../../../core/models/audit-log/dashboard-info-row";
import { map } from "rxjs";
import { GridOptions } from "ag-grid-community";
import { AgGridComponent, CardHeaderComponent, COLUMN_FILTERS } from "../../../../components";

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    AgGridComponent
  ]
})
export class InteractionsComponent implements OnInit {
  readonly #client = inject(AuditLogClient);
  readonly $getInteractionsDashboard = this.#client.getInteractionsDashboard().pipe(map(o => o.value));

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'name',
          headerName: 'Příkaz',
          tooltipField: 'name',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'duration',
          maxWidth: 150,
          cellDataType: 'duration'
        }
      ],
      getRowClass: params => {
        const data: DashboardInfoRow = params.data;
        return !data.success ? ['bg-danger-subtle'] : [];
      }
    };
  }
}
