import { Dictionary } from './../../../core/models/common';
import { UnverifyUserProfile } from './../../../core/models/unverify';
import { Component, OnInit } from '@angular/core';
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
        });
    }

    resolveChannelName(id: string): string {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }

    showReason(profile: UnverifyUserProfile): void {
        this.modalService.showNotification('Důvod odebrání přístupu', profile.reason);
    }
}
