import { inject, Pipe, PipeTransform } from "@angular/core";
import { LookupClient } from "../../../core/clients";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Guild } from "../../../core/models/guilds";
import { mapGuildToLookupRow } from "../../../core/mappers";

@Pipe({
  name: 'guildLookup',
  standalone: true
})
export class GuildLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string | null, ...args: any[]): Observable<string> {
    if (!value) {
      return of(mapGuildToLookupRow(null, undefined));
    }

    return this.#lookupClient.resolveGuild(value).pipe(
      catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as Guild | null) : throwError(() => err)),
      map(guild => mapGuildToLookupRow(guild, value))
    );
  }
}
