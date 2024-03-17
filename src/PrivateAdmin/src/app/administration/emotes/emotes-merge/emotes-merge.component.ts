import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmoteStatItem, MergeEmoteStatsParams } from 'src/app/core/models/emotes';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { EmotesNavigation } from '../navigation';
import { EMPTY, throwError } from 'rxjs';
import { NumberWithSpacesPipe } from 'src/app/shared/pipes/spaced-number.pipe';

@Component({
    selector: 'app-emotes-merge',
    templateUrl: './emotes-merge.component.html'
})
export class EmotesMergeComponent implements OnInit {
    title = 'Sloučení statistik emotes';
    navigation: INavigation;
    sourceEmote: EmoteStatItem;
    destinationEmote: string;
    guildId: string;

    constructor(
        private route: ActivatedRoute,
        private emotesService: EmotesService,
        private modalBox: ModalBoxService,
        private router: Router
    ) {
        this.navigation = new EmotesNavigation(route);
    }

    ngOnInit(): void {
        const emoteData = atob(decodeURIComponent(this.route.snapshot.params.encodedEmoteData as string));
        const [guildId, emoteId] = emoteData.split(/:(.*)/s);

        this.guildId = guildId;
        this.emotesService
            .getStatOfEmote(guildId, emoteId, true)
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.router.navigate(['/admin/emotes/unsupported']);
                    return EMPTY;
                }

                return throwError(() => err);
            }))
            .subscribe(emote => this.sourceEmote = emote);
    }

    process(): void {
        const modal = new QuestionModal(this.title, 'Opravdu si přejete sloučit statistiky?');
        modal.onAccept.subscribe(() => {
            const parameters = new MergeEmoteStatsParams(this.guildId, this.sourceEmote.emote.fullId, this.destinationEmote);

            this.emotesService.mergeStatsToAnother(parameters).subscribe(rowsChanged => {
                const rows = new NumberWithSpacesPipe().transform(rowsChanged);
                const infoModal = new InfoModal(this.title, `Statistiky sloučeny. Bylo změněno řádků: ${rows}`);
                infoModal.onClose.subscribe(() => {
                    this.router.navigate(['/admin/emotes/unsupported']);
                });

                this.modalBox.show(infoModal);
            });
        });

        this.modalBox.show(modal);
    }
}
