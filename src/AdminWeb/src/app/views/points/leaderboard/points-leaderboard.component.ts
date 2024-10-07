import { NgSelectComponent } from '@ng-select/ng-select';
import { Component, inject } from "@angular/core";
import { CardBodyComponent, CardComponent, ColComponent, FormDirective, FormLabelDirective, RowComponent } from "@coreui/angular";
import { AsyncLookupCellRendererComponent, CardHeaderComponent, STRIPED_ROW_STYLE, usePipeTransform } from "../../../components";
import { VisibilityDirective } from "../../../core/directives/visibility.directive";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AgGridComponent } from "../../../components/ag-grid/ag-grid.component";
import { LookupClient } from "../../../core/clients/lookup.client";
import { AsyncPipe } from '@angular/common';
import { SpacedNumberPipe, WithLoadingPipe } from '../../../pipes';
import { NgSelectorDirective } from '../../../core/directives/ng-selector.directive';
import { GridOptions } from 'ag-grid-community';
import { PointsClient } from '../../../core/clients/points.client';
import { catchError, filter, map, Observable, of, throwError } from 'rxjs';
import { BoardItem } from '../../../core/models/points/board-item';
import { User } from '../../../core/models/users/user';
import { HttpErrorResponse } from '@angular/common/http';
import { mapUserToLookupRow } from '../../../core/mappers/lookup.mapper';

@Component({
  templateUrl: './points-leaderboard.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    VisibilityDirective,
    ReactiveFormsModule,
    FormDirective,
    FormLabelDirective,
    AgGridComponent,
    NgSelectComponent,
    AsyncPipe,
    WithLoadingPipe,
    NgSelectorDirective,
    AgGridComponent
  ]
})
export class PointsLeaderboardComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #lookupClient = inject(LookupClient);
  readonly #pointsClient = inject(PointsClient);

  guildLookupSource$ = this.#lookupClient.resolveGuildList();
  leaderboardSource$ = this.createLeaderboardSource(null);

  form: FormGroup<{
    guildId: FormControl<string | null>
  }>;

  gridOptions: GridOptions

  constructor() {
    this.form = this.#formBuilder.group({
      guildId: this.#formBuilder.control(null as string | null, {
        validators: [Validators.required]
      })
    });

    this.form.controls.guildId.valueChanges.subscribe(guildId => {
      this.leaderboardSource$ = this.createLeaderboardSource(guildId);
    });

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
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 200
        },
        {
          field: 'monthBack',
          headerName: 'Za posl. měsíc',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 200
        },
        {
          field: 'today',
          headerName: 'Dnes',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 200
        },
        {
          field: 'total',
          headerName: 'Celkem',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 200
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
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
