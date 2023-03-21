import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmoteStatItem, MergeEmoteStatsParams } from 'src/app/core/models/emotes';
import { Component, EventEmitter, Output } from '@angular/core';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-merge-modal',
    templateUrl: './merge-modal.component.html',
    styleUrls: ['./merge-modal.component.scss']
})
export class MergeModalComponent {
    @Output() merged = new EventEmitter<unknown>();

    sourceItem: EmoteStatItem;
    destinationEmote: string;

    constructor(
        private emotesService: EmotesService,
        private modalService: ModalService,
        private modal: NgbActiveModal
    ) { }

    process(): void {
        this.modalService.showQuestion('Sloučení statistik emote', 'Opravdu si přeješ sloučit statistiky?').onAccept.subscribe(_ => {
            const params = new MergeEmoteStatsParams(this.sourceItem.emote.fullId, this.destinationEmote);

            this.emotesService.mergeStatsToAnother(params).subscribe(rowsChanged => {
                this.modalService.showNotification(
                    'Sloučení statistik emote',
                    `Statistiky sloučeny. Bylo změněno řádků: ${rowsChanged.toLocaleString()}`
                ).onClose.subscribe(() => {
                    this.merged.emit();
                    this.modal.close();
                });

            });
        });
    }

}
