import { SpacedNumberPipe } from './../../../../pipes/spaced-number.pipe';
import { Component, ElementRef, OnInit, TemplateRef, inject, viewChild } from "@angular/core";
import { DashboardClient } from "../../../../core/clients/dashboard.client";
import { CardBodyComponent, CardComponent, CardHeaderComponent, TableDirective } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { WithLoadingPipe } from "../../../../pipes/with-loading.pipe";
import { AsyncPipe } from "@angular/common";
import { LoadingComponent } from "../../../../components/loading/loading.component";
import { TimeSpanPipe } from "../../../../pipes/timespan.pipe";
import { SimpleDataTableComponent } from "../../../../components/data-table/simple-data-table.component";
import { SimpleDataTableDefs } from "../../../../components/data-table/simple-data-table.models";
import { CounterStats } from "../../../../core/models/dashboard/counter-stats";
import { of } from 'rxjs';

@Component({
  selector: 'app-top-heavy-operations',
  templateUrl: './top-heavy-operations.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    IconDirective,
    WithLoadingPipe,
    AsyncPipe,
    LoadingComponent,
    SpacedNumberPipe,
    TimeSpanPipe,
    SimpleDataTableComponent
  ]
})
export class TopHeavyOperationsComponent implements OnInit {
  readonly #client = inject(DashboardClient);
  readonly $getTopHeavyOperations = this.#client.getTopHeavyOperations();

  readonly barChartIcon = viewChild<TemplateRef<HTMLElement>>('barChartIcon');

  tableDefs!: SimpleDataTableDefs<CounterStats>;

  ngOnInit(): void {
    this.tableDefs = {
      dataSource: this.$getTopHeavyOperations,
      columns: {
        $index: {
          headerClasses: ['text-center'],
          headerTemplate: this.barChartIcon(),
          width: 45
        },
        section: { headerText: 'Sekce' },
        count: {
          headerText: 'Počet volání',
          dataClasses: ['text-end', 'border'],
          valueFormatter: (value: number) => of(new SpacedNumberPipe().transform(value))
        },
        totalTime: {
          headerText: 'Celkový čas',
          dataClasses: ['text-end', 'border'],
          valueFormatter: (value: number) => of(new TimeSpanPipe().transform(value))
        },
        averageTime: {
          headerText: 'Průměrný čas',
          dataClasses: ['text-end', 'border'],
          valueFormatter: (value: number) => of(new TimeSpanPipe().transform(value))
        }
      },
      table: {
        hover: false,
        responsive: true,
        striped: true,
        tableClasses: ['mb-0', 'border'],
        small: true
      }
    }
  }
}
