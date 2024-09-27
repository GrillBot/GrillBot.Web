import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent, CardHeaderComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AgGridComponent } from "../../../../components/ag-grid/ag-grid.component";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { map } from "rxjs";
import { GridOptions } from "ag-grid-community";
import { usePipeTransform } from "../../../../components/ag-grid/ag-grid.functions";
import { TimeSpanPipe } from "../../../../pipes/timespan.pipe";
import { DashboardInfoRow } from "../../../../core/models/audit-log/dashboard-info-row";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    AgGridComponent
  ]
})
export class JobsComponent implements OnInit {
  readonly #client = inject(AuditLogClient);
  readonly $getJobDashboard = this.#client.getJobDashboard().pipe(map(o => o.value!));

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'name',
          headerName: 'Úloha',
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
