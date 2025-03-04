import { inject, Pipe, PipeTransform } from "@angular/core";
import { LookupClient } from "../../../core/clients";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { User } from "../../../core/models/users/user";
import { HttpErrorResponse } from "@angular/common/http";

@Pipe({
  name: 'userLookup',
  standalone: true
})
export class UserLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string | null, ..._: any[]): Observable<string> {
    return UserLookupPipe.processTransform(value, this.#lookupClient);
  }

  static processTransform(userId: string | null, lookupClient: LookupClient): Observable<string> {
    if (!userId) {
      return of(this.createUserName(null, undefined));
    }

    return lookupClient.resolveUser(userId).pipe(
      catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as User | null) : throwError(() => err)),
      map(user => this.createUserName(user, userId))
    );
  }

  private static createUserName(user: User | null, userId?: string): string {
    if (!user) {
      return 'Neznámý uživatel' + (userId ? ` ${userId}` : '');
    }

    return user.globalAlias ? `${user.globalAlias} (${user.username})` : user.username;
  };
}
