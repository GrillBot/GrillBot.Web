import { AsyncPipe } from "@angular/common";
import { Component, forwardRef, inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { WithLoadingPipe } from "../../../pipes";
import { NgSelectorDirective } from "../../../core/directives/ng-selector.directive";
import { LookupClient } from "../../../core/clients/lookup.client";
import { LookupBaseComponent } from "../lookup.component.base";

@Component({
  selector: 'app-guild-lookup',
  templateUrl: './guild-lookup.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    NgSelectComponent,
    NgSelectorDirective,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GuildLookupComponent),
      multi: true
    }
  ]
})
export class GuildLookupComponent extends LookupBaseComponent<string> {
  readonly #lookupClient = inject(LookupClient);

  guildLookupSource$ = this.#lookupClient.resolveGuildList();

  constructor() {
    super();
  }
}
