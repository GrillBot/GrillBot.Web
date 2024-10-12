import { AsyncPipe } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { WithLoadingPipe } from "../../../pipes";
import { NgSelectorDirective } from "../../../core/directives/ng-selector.directive";
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
  guildLookupSource$ = this.lookupClient.resolveGuildList();
}
