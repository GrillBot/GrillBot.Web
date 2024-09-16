import { filter, map } from 'rxjs/operators';
import { Component, computed, inject, OnInit } from "@angular/core";
import { SimpleDataTableComponent } from "../../../../components/data-table/simple-data-table.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent } from "@coreui/angular";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { IconDirective } from "@coreui/icons-angular";
import { SimpleDataTableDefs } from "../../../../components/data-table/simple-data-table.models";
import { DashboardRow } from "../../../../core/models/user-measures/dashboard-row";
import { LookupClient } from '../../../../core/clients/lookup.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-measures',
  templateUrl: './user-measures.component.html',
  standalone: true,
  imports: [
    SimpleDataTableComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective
  ]
})
export class UserMeasuresComponent implements OnInit {
  readonly #userMeasuresClient = inject(UserMeasuresClient);
  readonly #lookupClient = inject(LookupClient);

  tableDefs!: SimpleDataTableDefs<DashboardRow>;

  ngOnInit(): void {
    this.tableDefs = {
      dataSource: this.#userMeasuresClient.getDashboard(),
      columns: {
        userId: {
          headerText: 'Uživatel',
          asyncValueFormatter: (userId: string) =>
            this.#lookupClient.resolveUser(userId).pipe(
              filter(response => response.type == 'finish'),
              map(response => response.value!),
              map(user => user.globalAlias ?? user.username)
            )
        },
        type: {
          headerText: 'Typ opatření',
          width: 250,
          dataClasses: ['border'],
          valueFormatter: (value: string) => value.replace('Warning', 'Varování')
        }
      },
      table: {
        hover: true,
        responsive: true,
        small: true,
        striped: true,
        tableClasses: ['mb-0', 'border']
      }
    };
  }
}
