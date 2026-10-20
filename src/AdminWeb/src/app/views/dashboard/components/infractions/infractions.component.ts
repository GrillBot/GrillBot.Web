import { map } from 'rxjs/operators';
import { Component, inject, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { InfractionsClient } from "../../../../core/clients/infractions.client";
import { LookupClient } from '../../../../core/clients/lookup.client';
import { GridOptions } from 'ag-grid-community';
import {
  AgGridComponent, AsyncLookupCellRendererComponent, STRIPED_ROW_STYLE,
  CardHeaderComponent, UserLookupPipe
} from '../../../../components';

@Component({
  selector: 'app-infractions',
  templateUrl: './infractions.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    AgGridComponent
  ]
})
export class InfractionsComponent implements OnInit {
  readonly #infractionsClient = inject(InfractionsClient);
  readonly #lookupClient = inject(LookupClient);
  readonly $getDashboard = this.#infractionsClient.getDashboard().pipe(map(o => o.value));

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
