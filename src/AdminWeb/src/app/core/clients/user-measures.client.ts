import { DashboardRow } from './../models/user-measures/dashboard-row';
import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithPagination } from '../models/common';
import { MeasuresListParams } from '../models/user-measures/measures-list-params';
import { MeasuresItem } from '../models/user-measures/measures-item';

@Injectable({ providedIn: 'root' })
export class UserMeasuresClient extends BaseClient {
  getMeasuresList = (request: WithPagination<MeasuresListParams>) =>
    this.postRequest<PaginatedResponse<MeasuresItem>>('service/UserMeasures/measures-list', request);

  deleteMeasure = (measureId: string) => this.deleteRequest(`service/UserMeasures/${measureId}`);

  getDashboard = () => this.getRequest<DashboardRow[]>('service/usermeasures/dashboard');
}
