import { EmoteStatItem, MergeEmoteStatsParams } from 'src/app/core/models/emotes';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-merge-modal',
    templateUrl: './merge-modal.component.html',
    styleUrls: ['./merge-modal.component.scss']
})
export class MergeModalComponent {
    sourceItem: EmoteStatItem;
    destinationEmote: string;

    constructor(
        private emotesService: EmotesService,
        @Inject(DATA_INJECTION_TOKEN) injectedData: EmoteStatItem
    ) {
        this.sourceItem = injectedData;
    }

    process(): void {
        // TODO Rework to page


        //this.modalService.showQuestion('Sloučení statistik emote', 'Opravdu si přeješ sloučit statistiky?').onAccept.subscribe(_ => {
        //    const params = new MergeEmoteStatsParams(this.sourceItem.emote.fullId, this.destinationEmote);
        //
        //    this.emotesService.mergeStatsToAnother(params).subscribe(rowsChanged => {
        //        this.modalService.showNotification(
        //            'Sloučení statistik emote',
        //            `Statistiky sloučeny. Bylo změněno řádků: ${rowsChanged.toLocaleString()}`
        //        ).onClose.subscribe(() => {
        //            this.merged.emit();
        //            this.modal.close();
        //        });
        //
        //    });
        //});
    }

}
