import { inject, Pipe, PipeTransform } from "@angular/core";
import { LookupClient } from "../../../core/clients";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Channel } from "../../../core/models/channels/channel";

@Pipe({
  name: 'channelLookup',
  standalone: true
})
export class ChannelLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string | null, ..._: any[]): Observable<string> {
    return ChannelLookupPipe.processTransform(value, this.#lookupClient);
  }

  static processTransform(channelId: string | null, lookupClient: LookupClient): Observable<string> {
    if (!channelId) {
      return of(this.createChannelName(null, undefined));
    }

    return lookupClient.resolveChannel(channelId).pipe(
      catchError((err: HttpErrorResponse) => err.status == 404 ? of(null as Channel | null) : throwError(() => err)),
      map(channel => this.createChannelName(channel, channelId))
    );
  }

  private static createChannelName(channel: Channel | null, channelId?: string): string {
    return channel?.name ?? 'Neznámý kanál' + (channelId ? ` ${channelId}` : '');
  };
}
