import { Component, OnInit, inject } from "@angular/core";
import { DashboardClient } from "../../../../core/clients/dashboard.client";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { map } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import {
  AgGridComponent, COLUMN_FILTERS, INDEX_COLUMN, STRIPED_ROW_STYLE, usePipeTransform, CardHeaderComponent
} from '../../../../components';
import { SpacedNumberPipe, TimeSpanPipe } from "../../../../pipes";

@Component({
  selector: 'app-top-heavy-operations',
  templateUrl: './top-heavy-operations.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    AgGridComponent
  ]
})
export class TopHeavyOperationsComponent implements OnInit {
  readonly #client = inject(DashboardClient);
  readonly $getTopHeavyOperations = this.#client.getTopHeavyOperations().pipe(map(o => o.value));

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        INDEX_COLUMN,
        {
          field: 'section',
          headerName: 'Sekce',
          tooltipField: 'section',
          filter: COLUMN_FILTERS.TEXT
        },
        {
          field: 'count',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          headerName: 'Počet',
          maxWidth: 100,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'totalTime',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          headerName: 'Celkový čas',
          maxWidth: 150
        },
        {
          field: 'averageTime',
          valueFormatter: params => usePipeTransform(params, TimeSpanPipe),
          headerName: 'Průměrný čas',
          maxWidth: 150
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    }
  }
}
