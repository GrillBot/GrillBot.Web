import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { EmotesListParams, EmoteStatItem } from 'src/app/core/models/emotes';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { ModalService } from 'src/app/shared/modal';
import { MergeModalComponent } from '../../merge-modal/merge-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<EmotesListParams> {
    unsupported = false;

    constructor(
        private emotesService: EmotesService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute
    ) { super(); }

    configure(): void {
        this.sort.orderBy = 'UseCount';
        this.sort.descending = true;
        this.unsupported = this.activatedRoute.snapshot.routeConfig.path === 'unsupported';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);

        if (this.unsupported) {
            return this.emotesService.getStatsOfUnsupportedEmotes(this.filter);
        } else {
            return this.emotesService.getStatsOfSupportedEmotes(this.filter);
        }
    }

    mergeStatsToAnother(row: EmoteStatItem): void {
        const modal = this.modalService.showCustomModal<MergeModalComponent>(MergeModalComponent);
        modal.componentInstance.sourceItem = row;

        const mergedSub = modal.componentInstance.merged.subscribe(_ => this.list.filterChanged());
        modal.onClose.subscribe(_ => mergedSub.unsubscribe());
    }

    removeStats(row: EmoteStatItem): void {
        this.modalService.showQuestion(
            'Smazání statistiky',
            `Opravdu si přeješ smazat statistiku pro emote "${row.emote.name}"? <b>Tato akce je nevratná!</b>`
        ).onAccept.subscribe(_ => {
            this.emotesService.removeStatistics(row.emote.fullId).subscribe(rowsChanged => {
                this.modalService.showNotification(
                    'Smazání statistiky',
                    `Statistika byla úspěšně smazána. Počet smazaných záznamů: ${rowsChanged.toLocaleString()}`
                ).onClose.subscribe(() => this.list.filterChanged());
            });
        });
    }
}
