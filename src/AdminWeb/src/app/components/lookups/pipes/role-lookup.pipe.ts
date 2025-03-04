import { inject, Pipe, PipeTransform } from "@angular/core";
import { LookupClient } from "../../../core/clients";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Role } from "../../../core/models/roles/role";

@Pipe({
  name: 'roleLookup',
  standalone: true
})
export class RoleLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string | null, ..._: any[]): Observable<string> {
    return RoleLookupPipe.processTransform(value, this.#lookupClient);
  }

  static processTransform(roleId: string | null, lookupClient: LookupClient): Observable<string> {
    if (!roleId) {
      return of(this.createRoleName(null, undefined));
    }

    return lookupClient.resolveRole(roleId).pipe(
      catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as Role | null) : throwError(() => err)),
      map(role => this.createRoleName(role, roleId))
    );
  }

  private static createRoleName(role: Role | null, roleId?: string): string {
    return !role ? 'Neznámá role' + (roleId ? ` ${roleId}` : '') : role.name;
  };
}
