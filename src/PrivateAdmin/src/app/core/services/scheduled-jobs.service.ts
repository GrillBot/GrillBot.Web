import { QueryParam } from './../models/http';
import { map, catchError } from 'rxjs';
import { Injectable } from "@angular/core";
import { EmptyObservable, List, ObservableList } from "../models/common";
import { ScheduledJob } from "../models/scheduled-jobs";
import { BaseService } from "./base.service";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ScheduledJobsService {
    constructor(private base: BaseService) { }

    getScheduledJobs(): ObservableList<ScheduledJob> {
        const url = this.base.createUrl('jobs');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<ScheduledJob>>(url, { headers }).pipe(
            map(data => data.map((o: any) => ScheduledJob.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    runScheduledJob(jobName: string): EmptyObservable {
        const url = this.base.createUrl('jobs', [new QueryParam('jobName', jobName)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, {}, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateJob(jobName: string, enabled: boolean): EmptyObservable {
        const parameters = [
            new QueryParam('jobName', jobName),
            new QueryParam('enabled', enabled)
        ];
        const url = this.base.createUrl('jobs', parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, {}, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
