import { Component, computed, inject, input, OnInit, output, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, ListBaseComponent, ModalComponent, PaginatedGridComponent,
  UserLookupPipe
} from "../../../../components";
import { EmoteUserUsageItem, EmoteUserUsageListRequest } from "../../../../core/models/emote";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { EmoteClient, LookupClient } from "../../../../core/clients";
import { mapEmoteIdToName } from "../../../../core/mappers";
import { ButtonDirective } from "@coreui/angular";

@Component({
  selector: 'app-emote-usage-list',
  templateUrl: './emote-usage-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ButtonDirective,
    ModalComponent
  ]
})
export class EmoteUsageListComponent extends ListBaseComponent<EmoteUserUsageListRequest, EmoteUserUsageItem> implements OnInit {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);

  removeUserStatisticsRowModal = viewChild<ModalComponent>('removeUserStatisticsRowModal');
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
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
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
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'show-detail',
            title: 'Smazat',
            color: 'danger',
            action: row => this.removeUserStatisticsRowModal()?.open(
              () => this.userUsageItemRow = row,
              () => this.userUsageItemRow = undefined
            )
          }
        ], 200)
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
    const modal = this.removeUserStatisticsRowModal();
    if (!modal || !this.userUsageItemRow) {
      return;
    }

    this.#client.deleteStatistics(this.guildId(), this.emoteFullId(), this.userUsageItemRow.userId).subscribe(() => {
      this.removeUserStatisticsRowModal()?.close();
      this.reload();
      this.statisticsReloaded.emit();
    });
  }
}
