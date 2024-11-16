import { Injectable } from "@angular/core";
import { filter, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NotificationsManager {
  #notificationsSubject = new Subject<{ message: string, isError: boolean }>();

  $notifications = this.#notificationsSubject.asObservable()
    .pipe(filter(notif => (notif?.message.length ?? 0) > 0));

  pushNotification(message: string, isError: boolean) {
    this.#notificationsSubject.next({ message, isError });
  }
}
