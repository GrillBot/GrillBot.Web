import { map } from 'rxjs/operators';
import { Component, inject, OnInit } from "@angular/core";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { LookupClient } from '../../../../core/clients/lookup.client';
import { GridOptions } from 'ag-grid-community';
import {
  AgGridComponent, AsyncLookupCellRendererComponent, STRIPED_ROW_STYLE,
  CardHeaderComponent, UserLookupPipe
} from '../../../../components';

@Component({
  selector: 'app-user-measures',
  templateUrl: './user-measures.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
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
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
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
