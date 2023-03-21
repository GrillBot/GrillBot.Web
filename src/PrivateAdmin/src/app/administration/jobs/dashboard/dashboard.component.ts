import { List } from './../../../core/models/common';
import { ScheduledJobsService } from './../../../core/services/scheduled-jobs.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal';
import { ScheduledJob } from 'src/app/core/models/scheduled-jobs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    jobs?: List<ScheduledJob>;

    constructor(
        private modalService: ModalService,
        private service: ScheduledJobsService
    ) { }

    ngOnInit(): void {
        this.service.getScheduledJobs().subscribe(jobs => this.jobs = jobs);
    }

    triggerJob(job: ScheduledJob): void {
        this.modalService.showQuestion('Spuštění úlohy', 'Opravdu si přejete spustit úlohu?').onAccept.subscribe(() => {
            this.service.runScheduledJob(job.name).subscribe(() => {
                this.ngOnInit();
                this.modalService.showNotification('Spuštění úlohy', 'Požadavek na spuštění úlohy byl odeslán.');
            });
        });
    }

    updateJob(job: ScheduledJob, enabled: boolean): void {
        const message = 'Opravdu si přejete ' + (enabled ? 'aktivovat' : 'deaktivovat') + ' naplánovanou úlohu?';
        const title = (enabled ? 'Aktivace' : 'Deaktivace') + ' naplánované úlohy';
        const successMessage = 'Úloha byla úspěšně ' + (enabled ? 'aktivována' : 'deaktivována') + '.';

        this.modalService.showQuestion(title, message).onAccept.subscribe(() => {
            this.service.updateJob(job.name, enabled).subscribe(() => {
                this.ngOnInit();
                this.modalService.showNotification(title, successMessage);
            });
        });
    }
}
