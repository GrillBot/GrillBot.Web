import { ErrorHandler, inject, Injectable } from "@angular/core";
import { NotificationsManager } from "../managers/notifications.manager";

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  readonly #manager = inject(NotificationsManager);

  handleError(error: Error | string): void {
    this.#manager.pushNotification(this.parseErrorMessage(error), true);
    console.error(error);
  }

  private parseErrorMessage(error: Error | string): string {
    return typeof error === 'string' ? error : error.message;
  }
}
