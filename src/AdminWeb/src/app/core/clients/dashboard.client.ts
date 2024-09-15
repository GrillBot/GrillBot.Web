import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { DashboardInfo } from "../models/dashboard/dashboard-info";
import { RawHttpResponse } from "../models/common";
import { DashboardService } from "../models/dashboard/dashboard-service";

@Injectable({ providedIn: 'root' })
export class DashboardClient extends BaseClient {
  constructor() {
    super();
  }

  getCommonInfo: () => Observable<RawHttpResponse<DashboardInfo>> = () => this.getRequest('dashboard/bot-common-info');

  getServiceInfo: (serviceId: string) => Observable<RawHttpResponse<DashboardService>>
    = (serviceId: string) => this.getRequest(`dashboard/service-info/${serviceId}`);
}
