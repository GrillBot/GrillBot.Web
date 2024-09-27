import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent, CardHeaderComponent, CardTitleDirective } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { DashboardInfoRow } from "../../../../core/models/audit-log/dashboard-info-row";
import { map } from "rxjs";
import { TimeSpanPipe } from "../../../../pipes/timespan.pipe";
import { GridOptions } from "ag-grid-community";
import { AgGridComponent } from "../../../../components/ag-grid/ag-grid.component";
import { usePipeTransform } from "../../../../components/ag-grid/ag-grid.functions";

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    CardTitleDirective,
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
          tooltipField: 'name'
        },
        {
          field: 'duration',
          maxWidth: 150,
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe)
        }
      ],
      getRowClass: params => {
        const data: DashboardInfoRow = params.data;
        return !data.success ? ['bg-danger-subtle'] : [];
      }
    };
  }
}
