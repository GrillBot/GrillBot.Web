import { UpdateUnverifyTimeModalComponent } from './../update-unverify-time-modal/update-unverify-time-modal.component';
import { Dictionary } from './../../../core/models/common';
import { UnverifyUserProfile, UpdateUnverifyParams } from './../../../core/models/unverify';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataService } from 'src/app/core/services/data.service';
import { forkJoin } from 'rxjs';
import { ModalService } from 'src/app/shared/modal';

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
        private modalService: ModalService
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
        const questionMessage = force ?
            'Opravdu si přejete smazat toto odebrání přístupu?<br><b>Tato akce je nevratná a nevrací uživateli přístup!</b>' :
            'Opravdu si přejete vrátit přístup tomto uživateli?';
        this.modalService.showQuestion('Vrácení přístupu', questionMessage).onAccept.subscribe(_ => {
            button.disabled = true;
            this.unverifyService.removeUnverify(profile.guild.id, profile.user.id, force).subscribe(() => this.reloadData());
        });
    }

    openTimeUpdate(profile: UnverifyUserProfile, button: HTMLButtonElement): void {
        const modal = this.modalService.showCustomModal<UpdateUnverifyTimeModalComponent>(UpdateUnverifyTimeModalComponent);

        modal.componentInstance.profile = profile;
        modal.onAccept.subscribe(_ => {
            const params = new UpdateUnverifyParams(modal.componentInstance.end, modal.componentInstance.reason);
            button.disabled = true;

            this.unverifyService.updateUnverifyTime(profile.guild.id, profile.user.id, params).subscribe(result => {
                this.modalService.showNotification('Změna času odebrání přístupu', result.replace(/\*\*/g, ''))
                    .onClose.subscribe(() => this.reloadData());
            });
        });
    }
}
