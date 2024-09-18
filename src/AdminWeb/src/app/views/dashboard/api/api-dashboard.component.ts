import { Component, inject, OnInit } from "@angular/core";
import { LoadingComponent } from "../../../components/loading/loading.component";
import { CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogClient } from "../../../core/clients/audit-log.client";
import { map } from "rxjs";
import { TimeSpanPipe } from "../../../pipes/timespan.pipe";
import { GridOptions } from "ag-grid-community";
import { DEFAULT_COL_DEF, DEFAULT_GRID_OPTIONS, STRIPED_ROW_STYLE } from "../../../components/ag-grid/ag-grid.defaults";
import { AgGridComponent } from "../../../components/ag-grid/ag-grid.component";
import { usePipeTransform } from "../../../components/ag-grid/ag-grid.functions";

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
      ...DEFAULT_GRID_OPTIONS,
      columnDefs: [
        {
          field: 'name',
          headerName: 'Endpoint',
          tooltipField: 'name'
        },
        {
          field: 'result',
          headerName: 'Výsledek',
        },
        {
          field: 'duration',
          headerName: 'Trvání',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          maxWidth: 140
        }
      ],
      defaultColDef: DEFAULT_COL_DEF,
      onGridReady: $event => {
        $event.api.autoSizeAllColumns();
      },
      suppressHorizontalScroll: true,
      getRowStyle: STRIPED_ROW_STYLE
    };
  }
}
