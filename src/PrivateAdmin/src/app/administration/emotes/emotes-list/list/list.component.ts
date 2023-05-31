import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { EmotesListParams, EmoteStatItem } from 'src/app/core/models/emotes';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { MergeModalComponent } from '../../merge-modal/merge-modal.component';
import { CustomComponentModal, InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<EmotesListParams> {
    unsupported = false;

    constructor(
        private emotesService: EmotesService,
        private activatedRoute: ActivatedRoute,
        private modalBox: ModalBoxService
    ) { super(); }

    configure(): void {
        this.sort.orderBy = 'UseCount';
        this.sort.descending = true;
        this.unsupported = this.activatedRoute.snapshot.routeConfig.path === 'unsupported';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.emotesService.getStatsOfEmotes(this.filter, this.unsupported);
    }

    mergeStatsToAnother(row: EmoteStatItem): void {
        // TODO Rework to page
        // const modal = new CustomComponentModal('Sloučení statistik emote', MergeModalComponent, null, row);
        /* modal.onClose.subscribe(() => {
            if (row.invalidated) {
                //this.list.filterChanged();
            }
        });*/

        // this.modalBox.show(modal);
    }

    removeStats(row: EmoteStatItem): void {
        const title = 'Smazání statistiky';

        const modal = new QuestionModal(title,
            `Opravdu si přeješ smazat statistiku pro emote "${row.emote.name}"? <b>Tato akce je nevratná!</b>`, true);
        modal.onAccept.subscribe(() => {
            this.emotesService.removeStatistics(row.emote.fullId).subscribe(rowsChanged => {
                this.list.filterChanged();
                this.modalBox.show(
                    new InfoModal(title, `Statistika byla úspěšně smazána. Počet smazaných záznamů: ${rowsChanged.toLocaleString()}`)
                );
            });
        });

        this.modalBox.show(modal);
    }
}
