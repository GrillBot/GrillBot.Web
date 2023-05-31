import { UpdateUnverifyTimeModalComponent } from './../update-unverify-time-modal/update-unverify-time-modal.component';
import { Dictionary } from './../../../core/models/common';
import { UnverifyUserProfile, UpdateUnverifyParams } from './../../../core/models/unverify';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataService } from 'src/app/core/services/data.service';
import { forkJoin } from 'rxjs';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-current-state',
    templateUrl: './current-state.component.html',
    styleUrls: ['./current-state.component.scss']
})
export class CurrentStateComponent implements OnInit {
    @ViewChildren('edit_button') editButtons: QueryList<ElementRef<HTMLButtonElement>>;
    @ViewChildren('remove_button') removeButtons: QueryList<ElementRef<HTMLButtonElement>>;
    @ViewChildren('force_remove_button') forceRemoveButtons: QueryList<ElementRef<HTMLButtonElement>>;

    profiles: UnverifyUserProfile[];
    channels: Dictionary<string, string>;

    constructor(
        private unverifyService: UnverifyService,
        private dataService: DataService,
        private modalBox: ModalBoxService
    ) { }

    ngOnInit(): void {
        this.reloadData();
    }

    reloadData(): void {
        this.profiles = null;

        forkJoin({
            unverify: this.unverifyService.getCurrentUnverifies(),
            channels: this.dataService.getChannels()
        }).subscribe(data => {
            this.channels = data.channels;
            this.profiles = data.unverify;

            this.editButtons.forEach(o => o.nativeElement.disabled = false);
            this.removeButtons.forEach(o => o.nativeElement.disabled = false);
            this.forceRemoveButtons.forEach(o => o.nativeElement.disabled = false);
        });
    }

    resolveChannelName(id: string): string {
        return (this.channels ? this.channels.find(o => o.key === id)?.value : '') ?? '';
    }

    removeUnverify(profile: UnverifyUserProfile, button: HTMLButtonElement, force: boolean): void {
        const title = 'Vrácení přístupu';
        const questionMessage = force ?
            'Opravdu si přejete smazat toto odebrání přístupu?<br><b>Tato akce je nevratná a nevrací uživateli přístup!</b>' :
            'Opravdu si přejete vrátit přístup tomto uživateli?';

        const modal = new QuestionModal(title, questionMessage, true);

        modal.onAccept.subscribe(() => {
            button.disabled = true;

            this.unverifyService.removeUnverify(profile.guild.id, profile.user.id, force).subscribe(() => {
                this.modalBox.show(new InfoModal(title, force ? 'Odebrání přístupu bylo smazáno.' : 'Přístup uživateli byl vrácen.'));
                this.reloadData();
            });
        });

        this.modalBox.show(modal);
    }

    openTimeUpdate(profile: UnverifyUserProfile, button: HTMLButtonElement): void {
        // TODO Rework do stránky
        // const modal = this.modalService.showCustomModal<UpdateUnverifyTimeModalComponent>(UpdateUnverifyTimeModalComponent);
        //
        // modal.componentInstance.profile = profile;
        // modal.onAccept.subscribe(_ => {
        //    const params = new UpdateUnverifyParams(modal.componentInstance.end, modal.componentInstance.reason);
        //    button.disabled = true;
        //
        //    this.unverifyService.updateUnverifyTime(profile.guild.id, profile.user.id, params).subscribe(result => {
        //        const infoModal = new InfoModal('Změna času odebrání přístupu', result.replace(/\*\*/g, ''));
        //        infoModal.onClose.subscribe(() => this.reloadData());
        //
        //        this.modalBox.show(infoModal);
        //    });
        // });
    }
}
