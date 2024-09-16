import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { RawHttpResponse } from "../models/common";
import { DashboardInfoRow } from "../models/audit-log/dashboard-info-row";

@Injectable({ providedIn: 'root' })
export class AuditLogClient extends BaseClient {
  constructor() {
    super();
  }

  getApiDashboard: (apiGroup: string) => Observable<RawHttpResponse<DashboardInfoRow[]>> =
    (apiGroup: string) => this.getRequest(`service/auditlog/dashboard/api`, { apiGroup });
}
