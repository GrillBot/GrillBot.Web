import { List } from './../../../core/models/common';
import { ScheduledJobsService } from './../../../core/services/scheduled-jobs.service';
import { Component, OnInit } from '@angular/core';
import { ScheduledJob } from 'src/app/core/models/scheduled-jobs';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    jobs?: List<ScheduledJob>;

    constructor(
        private service: ScheduledJobsService,
        private modalBox: ModalBoxService
    ) { }

    ngOnInit(): void {
        this.service.getScheduledJobs().subscribe(jobs => this.jobs = jobs);
    }

    triggerJob(job: ScheduledJob): void {
        const modal = new QuestionModal('Spuštění úlohy', `Opravdu si přejete spustit úlohu ${job.name}?`);
        modal.onAccept.subscribe(() => {
            this.service.runScheduledJob(job.name).subscribe(() => {
                this.ngOnInit();
                this.modalBox.show(new InfoModal('Spuštění úlohy', 'Požadavek na spuštění úlohy byl odeslán.'));
            });
        });

        this.modalBox.show(modal);
    }

    updateJob(job: ScheduledJob, enabled: boolean): void {
        const message = 'Opravdu si přejete ' + (enabled ? 'aktivovat' : 'deaktivovat') + ' naplánovanou úlohu?';
        const title = (enabled ? 'Aktivace' : 'Deaktivace') + ' naplánované úlohy';
        const successMessage = 'Úloha byla úspěšně ' + (enabled ? 'aktivována' : 'deaktivována') + '.';

        const modal = new QuestionModal(title, message);
        modal.onAccept.subscribe(() => {
            this.service.updateJob(job.name, enabled).subscribe(() => {
                this.ngOnInit();
                this.modalBox.show(new InfoModal(title, successMessage));
            });
        });

        this.modalBox.show(modal);
    }
}
