import { AsyncPipe } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { WithLoadingPipe } from "../../../core/pipes";
import { NgSelectorDirective } from "../../../core/directives";
import { LookupBaseComponent } from "../lookup.component.base";
import { Guild } from "../../../core/models/guilds";
import { FormLabelDirective } from "@coreui/angular";

@Component({
  selector: 'app-guild-lookup',
  templateUrl: './guild-lookup.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    NgSelectComponent,
    NgSelectorDirective,
    ReactiveFormsModule,
    FormLabelDirective
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
  guildLookupSource$ = this.lookupClient.resolveGuildList();

  guildSearch = (term: string, item: Guild): boolean => {
    return item.name.includes(term) || item.id.startsWith(term);
  };
}
