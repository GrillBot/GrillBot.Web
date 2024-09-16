import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { WithLoadingPipe } from "../../../pipes/with-loading.pipe";
import { LoadingComponent } from "../../../components/loading/loading.component";
import { CardBodyComponent, CardComponent, CardTitleDirective, ColComponent, RowComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogClient } from "../../../core/clients/audit-log.client";
import { ColumnCollectionDef, SimpleDataTableDefs, TableDef } from "../../../components/data-table/simple-data-table.models";
import { DashboardInfoRow } from "../../../core/models/audit-log/dashboard-info-row";
import { SimpleDataTableComponent } from "../../../components/data-table/simple-data-table.component";
import { of } from "rxjs";
import { TimeSpanPipe } from "../../../pipes/timespan.pipe";

@Component({
  selector: 'app-api-dashboard',
  templateUrl: './api-dashboard.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    LoadingComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    IconDirective,
    CardTitleDirective,
    SimpleDataTableComponent
  ]
})
export class ApiDashboardComponent implements OnInit {
  readonly #client = inject(AuditLogClient);

  publicApiTable!: SimpleDataTableDefs<DashboardInfoRow>;
  privateApiTable!: SimpleDataTableDefs<DashboardInfoRow>;

  ngOnInit(): void {
    const columns: ColumnCollectionDef = {
      name: {
        headerText: 'Endpoint'
      },
      result: {
        headerText: 'Výsledek',
        dataClasses: ['border']
      },
      duration: {
        headerText: 'Trvání',
        dataClasses: ['text-end', 'border'],
        headerClasses: ['text-end'],
        valueFormatter: (value: number) => of(new TimeSpanPipe().transform(value))
      }
    };

    const table: TableDef = {
      hover: false,
      responsive: true,
      small: true,
      striped: true,
      tableClasses: ['border']
    };

    this.publicApiTable = {
      dataSource: this.#client.getApiDashboard('V2'),
      columns: columns,
      table: table
    }

    this.privateApiTable = {
      dataSource: this.#client.getApiDashboard('V3'),
      columns: columns,
      table: table
    }
  }
}
