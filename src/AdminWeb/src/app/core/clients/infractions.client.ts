import { InfractionDashboardRow } from './../models/infractions/infraction-dashboard-row';
import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithPagination } from '../models/common';
import { InfractionListParams } from '../models/infractions/infraction-list-params';
import { InfractionItem } from '../models/infractions/infraction-item';
import { CreateMemberWarningParams } from '../models/infractions/create-member-warning-params';

@Injectable({ providedIn: 'root' })
export class InfractionsClient extends BaseClient {
  getInfractionList = (request: WithPagination<InfractionListParams>) =>
    this.postRequest<PaginatedResponse<InfractionItem>>('service/Infractions/list', request);

  deleteInfraction = (infractionId: string) => this.deleteRequest(`service/Infractions/${infractionId}`);

  createMemberWarning = (request: CreateMemberWarningParams) => this.postRequest('service/Infractions/member-warning', request);

  getDashboard = () => this.getRequest<InfractionDashboardRow[]>('service/Infractions/dashboard');
}
