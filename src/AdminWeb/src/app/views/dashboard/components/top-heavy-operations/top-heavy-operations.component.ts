import { Component, OnInit, inject } from "@angular/core";
import { DashboardClient } from "../../../../core/clients/dashboard.client";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { map } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import {
  AgGridComponent, COLUMN_FILTERS, INDEX_COLUMN, STRIPED_ROW_STYLE, CardHeaderComponent
} from '../../../../components';

@Component({
  selector: 'app-top-heavy-operations',
  templateUrl: './top-heavy-operations.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
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
          cellDataType: 'spacedNumber',
          headerName: 'Počet',
          maxWidth: 100,
          filter: COLUMN_FILTERS.NUMBER
        },
        {
          field: 'totalTime',
          headerName: 'Celkový čas',
          maxWidth: 150,
          cellDataType: 'duration'
        },
        {
          field: 'averageTime',
          headerName: 'Průměrný čas',
          maxWidth: 150,
          cellDataType: 'duration'
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    }
  }
}
