import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { DashboardInfo } from "../models/dashboard/dashboard-info";
import { RawHttpResponse } from "../models/common";
import { DashboardService } from "../models/dashboard/dashboard-service";
import { CounterStats } from "../models/dashboard/counter-stats";

@Injectable({ providedIn: 'root' })
export class DashboardClient extends BaseClient {
  constructor() {
    super();
  }

  getCommonInfo: () => Observable<RawHttpResponse<DashboardInfo>> = () => this.getRequest('dashboard/bot-common-info');

  getServiceInfo: (serviceId: string) => Observable<RawHttpResponse<DashboardService>>
    = (serviceId: string) => this.getRequest(`dashboard/service-info/${serviceId}`);

  getTopHeavyOperations: () => Observable<RawHttpResponse<CounterStats[]>>
    = () => this.getRequest('dashboard/top-heavy-operations');
}
