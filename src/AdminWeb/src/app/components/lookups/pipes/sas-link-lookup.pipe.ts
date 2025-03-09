import { inject, Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { LookupClient } from "../../../core/clients";

@Pipe({
  name: 'sasLinkLookup',
  standalone: true
})
export class SasLinkLookupPipe implements PipeTransform {
  readonly #lookupClient = inject(LookupClient);

  transform(value: string, ..._: any[]): Observable<string> {
    return this.#lookupClient.resolveSasLink(value);
  }
}
