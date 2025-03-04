import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { DashboardInfoRow } from "../models/audit-log/dashboard-info-row";
import { TodayAvgTimes } from "../models/audit-log/today-avg-times";
import { Detail, LogListItem, SearchRequest } from "../models/audit-log";

@Injectable({ providedIn: 'root' })
export class AuditLogClient extends BaseClient {
  getApiDashboard = (apiGroup: string) =>
    this.getRequest<DashboardInfoRow[]>(`service/auditlog/dashboard/api`, { apiGroup });

  getInteractionsDashboard = () =>
    this.getRequest<DashboardInfoRow[]>('service/auditlog/dashboard/interactions');

  getTodayAvgTimes = () =>
    this.getRequest<TodayAvgTimes>('service/auditlog/dashboard/today-avg-times');

  getJobDashboard = () =>
    this.getRequest<DashboardInfoRow[]>('service/auditlog/dashboard/jobs');

  searchItems = (request: WithSortAndPagination<SearchRequest>) =>
    this.postRequest<PaginatedResponse<LogListItem>>('service/auditlog/search', request);

  getDetail = (id: string) =>
    this.getRequest<Detail>(`service/auditlog/${id}`);
}
