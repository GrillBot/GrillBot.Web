import { Component, forwardRef } from "@angular/core";
import { LookupBaseComponent } from "../lookup.component.base";
import { AsyncPipe } from "@angular/common";
import { WithLoadingPipe } from "../../../core/pipes";
import { NgOptionTemplateDirective, NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../core/directives";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NgOptionHighlightDirective } from "@ng-select/ng-option-highlight";
import { Channel } from "../../../core/models/channels/channel";
import { FormLabelDirective } from "@coreui/angular";

@Component({
  selector: 'app-channel-lookup',
  templateUrl: './channel-lookup.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    NgSelectComponent,
    NgSelectorDirective,
    ReactiveFormsModule,
    NgOptionTemplateDirective,
    NgOptionHighlightDirective,
    FormLabelDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChannelLookupComponent),
      multi: true
    }
  ]
})
export class ChannelLookupComponent extends LookupBaseComponent<string> {
  channelLookupSource$ = this.lookupClient.resolveChannelList();

  channelSearch = (term: string, item: Channel): boolean => {
    return item.name.includes(term) || item.id.startsWith(term);
  }
}
