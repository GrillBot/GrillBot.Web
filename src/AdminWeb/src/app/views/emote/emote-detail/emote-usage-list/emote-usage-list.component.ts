import { Component, computed, inject, input, OnInit, output, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent,
  ListBaseComponent, PaginatedGridComponent
} from "../../../../components";
import { EmoteUserUsageItem, EmoteUserUsageListRequest } from "../../../../core/models/emote";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { EmoteClient, LookupClient } from "../../../../core/clients";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../../../core/models/users/user";
import { mapEmoteIdToName, mapUserToLookupRow } from "../../../../core/mappers";
import * as rxjs from 'rxjs';
import {
  ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";

@Component({
  selector: 'app-emote-usage-list',
  templateUrl: './emote-usage-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ModalTitleDirective,
    ButtonCloseDirective
  ]
})
export class EmoteUsageListComponent extends ListBaseComponent<EmoteUserUsageListRequest, EmoteUserUsageItem> implements OnInit {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);

  deleteUserStatisticsModal = viewChild<ModalComponent>('deleteUserStatisticsModal');
  userUsageItemRow?: EmoteUserUsageItem;

  guildId = input.required<string>();
  emoteFullId = input.required<string>();
  emoteName = computed(() => mapEmoteIdToName(this.emoteFullId()));

  statisticsReloaded = output();

  ngOnInit(): void {
    this.onFilterChanged({
      emoteId: this.emoteFullId(),
      guildId: this.guildId()
    });
  }

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) =>
              this.#lookupClient.resolveUser(userId).pipe(
                rxjs.catchError((err: HttpErrorResponse) => err.status == 404 ? rxjs.of(null as User | null) : rxjs.throwError(() => err)),
                rxjs.map(user => mapUserToLookupRow(user, userId)),
              )
          }
        },
        {
          field: 'firstOccurence',
          headerName: 'Prvně použito',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          context: {
            sortingKey: 'FirstOccurence'
          }
        },
        {
          field: 'lastOccurence',
          headerName: 'Naposledy použito',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          context: {
            sortingKey: 'LastOccurence'
          }
        },
        {
          field: 'useCount',
          headerName: 'Počet použití',
          cellDataType: 'spacedNumber',
          maxWidth: 160,
          sortable: true,
          context: {
            sortingKey: 'UseCount'
          }
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-detail',
                title: 'Smazat',
                size: 'sm',
                variant: 'ghost',
                color: 'danger',
                action: row => this.openModal(
                  this.deleteUserStatisticsModal(),
                  () => this.userUsageItemRow = row,
                  () => this.userUsageItemRow = undefined
                )
              }
            ] as ButtonDef[]
          },
          maxWidth: 200
        }
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<EmoteUserUsageListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<EmoteUserUsageItem>>> {
    return this.#client.getUserEmoteUsageList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: "UseCount",
      descending: true
    };
  }

  deleteUserStatistics(): void {
    const modal = this.deleteUserStatisticsModal();
    if (!modal || !this.userUsageItemRow) {
      return;
    }

    this.#client.deleteStatistics(this.guildId(), this.emoteFullId(), this.userUsageItemRow.userId).subscribe(() => {
      modal.visible = false;
      this.reload();
      this.statisticsReloaded.emit();
    });
  }
}
