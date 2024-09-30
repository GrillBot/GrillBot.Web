import { filter, map } from 'rxjs/operators';
import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { IconDirective } from "@coreui/icons-angular";
import { LookupClient } from '../../../../core/clients/lookup.client';
import { GridOptions } from 'ag-grid-community';
import { AgGridComponent, AsyncLookupCellRendererComponent, STRIPED_ROW_STYLE, CardHeaderComponent } from '../../../../components';

@Component({
  selector: 'app-user-measures',
  templateUrl: './user-measures.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    AgGridComponent
  ]
})
export class UserMeasuresComponent implements OnInit {
  readonly #userMeasuresClient = inject(UserMeasuresClient);
  readonly #lookupClient = inject(LookupClient);
  readonly $getDashboard = this.#userMeasuresClient.getDashboard().pipe(map(o => o.value));

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) =>
              this.#lookupClient.resolveUser(userId).pipe(
                filter(response => response.type === 'finish'),
                map(response => response.value!),
                map(user => user.globalAlias ? `${user.globalAlias} (${user.username})` : user.username)
              )
          }
        },
        {
          field: 'type',
          maxWidth: 150,
          valueFormatter: params => String(params.value).replace('Warning', 'Varování')
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    }
  }
}
