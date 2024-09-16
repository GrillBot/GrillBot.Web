import { DashboardRow } from './../models/user-measures/dashboard-row';
import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { RawHttpResponse } from '../models/common';

@Injectable({ providedIn: 'root' })
export class UserMeasuresClient extends BaseClient {
  constructor() {
    super();
  }

  getDashboard: () => Observable<RawHttpResponse<DashboardRow[]>> = () => this.getRequest('service/usermeasures/dashboard');
}
