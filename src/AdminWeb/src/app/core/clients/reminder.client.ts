import { inject, Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { PaginatedResponse, WithSortAndPagination } from "../models/common";
import { ReminderListRequest } from "../models/reminder/reminder-list-request";
import { RemindMessageItem } from "../models/reminder/remind-message-item";
import { CancelReminderRequest } from "../models/reminder/cancel-reminder-request";
import { AuthManager } from "../managers/auth.manager";

@Injectable({ providedIn: 'root' })
export class ReminderClient extends BaseClient {
  readonly #authManager = inject(AuthManager);

  getReminderList = (request: WithSortAndPagination<ReminderListRequest>) =>
    this.postRequest<PaginatedResponse<RemindMessageItem>>('service/Remind/list', request);

  cancelRemind = (request: CancelReminderRequest) => {
    const requestBody = {
      ...request,
      isAdminExecution: true,
      executingUserId: this.#authManager.token.id
    };

    return this.putRequest<unknown>('service/Remind/cancel', requestBody);
  };
}
