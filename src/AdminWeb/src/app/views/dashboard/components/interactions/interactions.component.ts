import { Component, inject, OnInit, TemplateRef, viewChild } from "@angular/core";
import { SimpleDataTableComponent } from "../../../../components/data-table/simple-data-table.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent, CardTitleDirective } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuditLogClient } from "../../../../core/clients/audit-log.client";
import { DashboardInfoRow } from "../../../../core/models/audit-log/dashboard-info-row";
import { SimpleDataTableDefs } from "../../../../components/data-table/simple-data-table.models";
import { of } from "rxjs";
import { TimeSpanPipe } from "../../../../pipes/timespan.pipe";

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  standalone: true,
  imports: [
    SimpleDataTableComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    CardTitleDirective
  ]
})
export class InteractionsComponent implements OnInit {
  readonly #client = inject(AuditLogClient);
  readonly successIcon = viewChild<TemplateRef<HTMLElement>>('successIcon');
  readonly failedIcon = viewChild<TemplateRef<HTMLElement>>('failedIcon');

  tableDefs!: SimpleDataTableDefs<DashboardInfoRow>;

  ngOnInit(): void {
    this.tableDefs = {
      dataSource: this.#client.getInteractionsDashboard(),
      columns: {
        name: {
          headerText: 'Příkaz'
        },
        duration: {
          headerText: 'Trvání',
          dataClasses: ['border'],
          headerClasses: ['border'],
          valueFormatter: (value: number) => of(new TimeSpanPipe().transform(value))
        },
        success: {
          headerText: '',
          width: 50,
          headerClasses: ['text-center', 'border'],
          dataClasses: ['text-center'],
          valueFormatter: (value: boolean) => of(value ? this.successIcon()! : this.failedIcon()!)
        }
      },
      table: {
        hover: false,
        responsive: true,
        small: true,
        striped: true,
        tableClasses: ['border']
      }
    }
  }
}
