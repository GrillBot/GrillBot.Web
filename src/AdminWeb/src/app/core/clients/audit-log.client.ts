import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { RawHttpResponse } from "../models/common";
import { DashboardInfoRow } from "../models/audit-log/dashboard-info-row";
import { TodayAvgTimes } from "../models/audit-log/today-avg-times";

@Injectable({ providedIn: 'root' })
export class AuditLogClient extends BaseClient {
  constructor() {
    super();
  }

  getApiDashboard: (apiGroup: string) => Observable<RawHttpResponse<DashboardInfoRow[]>> =
    (apiGroup: string) => this.getRequest(`service/auditlog/dashboard/api`, { apiGroup });

  getInteractionsDashboard: () => Observable<RawHttpResponse<DashboardInfoRow[]>> =
    () => this.getRequest('service/auditlog/dashboard/interactions');

  getTodayAvgTimes: () => Observable<RawHttpResponse<TodayAvgTimes>> =
    () => this.getRequest('service/auditlog/dashboard/today-avg-times');

  getJobDashboard: () => Observable<RawHttpResponse<DashboardInfoRow[]>> =
    () => this.getRequest('service/auditlog/dashboard/jobs');
}
