import { Component, DestroyRef, inject } from "@angular/core";
import { CardComponent, FormLabelDirective } from "@coreui/angular";
import { AsyncLookupCellRendererComponent, CardHeaderComponent, FormCardBodyComponent, STRIPED_ROW_STYLE, usePipeTransform } from "../../../components";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { AgGridComponent } from "../../../components/ag-grid/ag-grid.component";
import { LookupClient } from "../../../core/clients/lookup.client";
import { SpacedNumberPipe } from '../../../core/pipes';
import { GridOptions } from 'ag-grid-community';
import { PointsClient } from '../../../core/clients/points.client';
import { catchError, filter, map, Observable, of, throwError } from 'rxjs';
import { BoardItem } from '../../../core/models/points/board-item';
import { User } from '../../../core/models/users/user';
import { HttpErrorResponse } from '@angular/common/http';
import { mapUserToLookupRow } from '../../../core/mappers/lookup.mapper';
import { LeaderboardFilter } from '../../../core/models/points/leaderboard-filter';
import { IForm } from '../../../core/models/common';
import { GuildLookupComponent } from '../../../components/lookups';
import { FilterBaseComponent } from "../../../components/filters";

@Component({
  templateUrl: './points-leaderboard.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    FormLabelDirective,
    AgGridComponent,
    GuildLookupComponent,
    FormCardBodyComponent
  ]
})
export class PointsLeaderboardComponent extends FilterBaseComponent<LeaderboardFilter> {
  readonly #lookupClient = inject(LookupClient);
  readonly #pointsClient = inject(PointsClient);
  readonly #destroyRef = inject(DestroyRef);

  leaderboardSource$ = this.createLeaderboardSource(null);
  gridOptions: GridOptions

  constructor() {
    super();

    const sub = this.filterEvent.subscribe(filter => {
      this.leaderboardSource$ = this.createLeaderboardSource(filter.guildId);
    });

    this.#destroyRef.onDestroy(() => sub.unsubscribe());

    this.gridOptions = {
      columnDefs: [
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) =>
              this.#lookupClient.resolveUser(userId).pipe(
                catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as User | null) : throwError(() => err)),
                map(user => mapUserToLookupRow(user, userId)),
              )
          }
        },
        {
          field: 'yearBack',
          headerName: 'Za posl. rok',
          maxWidth: 200,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'monthBack',
          headerName: 'Za posl. měsíc',
          maxWidth: 200,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'today',
          headerName: 'Dnes',
          maxWidth: 200,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'total',
          headerName: 'Celkem',
          maxWidth: 200,
          cellDataType: 'spacedNumber'
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override configure(): void {
    this.debounceTime = 100;
  }

  override createForm(): IForm<LeaderboardFilter> {
    return {
      guildId: this.createControl({
        validators: [Validators.required]
      })
    };
  }


  private createLeaderboardSource(guildId: string | null): Observable<BoardItem[]> {
    return guildId ?
      this.#pointsClient.getLeaderboard(guildId).pipe(
        filter(res => res.type === 'finish'),
        map(res => res.value!)
      ) : of([]);
  }
}
