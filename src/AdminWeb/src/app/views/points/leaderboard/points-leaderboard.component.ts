import { Component, DestroyRef, inject } from "@angular/core";
import { AsyncLookupCellRendererComponent, STRIPED_ROW_STYLE } from "../../../components";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { AgGridComponent } from "../../../components/ag-grid/ag-grid.component";
import { LookupClient } from "../../../core/clients/lookup.client";
import { GridOptions } from 'ag-grid-community';
import { PointsClient } from '../../../core/clients/points.client';
import { filter, map, Observable, of } from 'rxjs';
import { BoardItem } from '../../../core/models/points/board-item';
import { LeaderboardFilter } from '../../../core/models/points/leaderboard-filter';
import { IForm } from '../../../core/models/common';
import { GuildLookupComponent, UserLookupPipe } from '../../../components/lookups';
import { FilterBaseComponent, FilterCardComponent } from "../../../components/filters";
import { ValidationErrorsComponent } from "../../../components/forms/validation-errors/validation-errors.component";

@Component({
  templateUrl: './points-leaderboard.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AgGridComponent,
    GuildLookupComponent,
    ValidationErrorsComponent,
    FilterCardComponent
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
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
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
