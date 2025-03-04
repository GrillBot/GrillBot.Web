import { inject, Pipe, PipeTransform } from "@angular/core";
import { LookupClient } from "../../../core/clients";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Guild } from "../../../core/models/guilds";

@Pipe({
  name: 'guildLookup',
  standalone: true
})
export class GuildLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string | null, ..._: any[]): Observable<string> {
    return GuildLookupPipe.processTransform(value, this.#lookupClient);
  }

  static processTransform(guildId: string | null, lookupClient: LookupClient): Observable<string> {
    if (!guildId) {
      return of(this.createGuildName(null, undefined));
    }

    return lookupClient.resolveGuild(guildId).pipe(
      catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as Guild | null) : throwError(() => err)),
      map(guild => this.createGuildName(guild, guildId))
    );
  }

  private static createGuildName(guild: Guild | null, guildId?: string): string {
    return guild?.name ?? 'Neznámý server' + (guildId ? ` ${guildId}` : '');
  }
}
