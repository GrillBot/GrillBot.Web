import { Component, computed, forwardRef, inject, input } from "@angular/core";
import { LookupBaseComponent } from "../lookup.component.base";
import { AsyncPipe } from "@angular/common";
import { WithLoadingPipe } from "../../../core/pipes";
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../core/directives";
import { NgOptionHighlightDirective } from "@ng-select/ng-option-highlight";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { EmoteClient } from "../../../core/clients";
import { mapEmoteIdToName, mapEmoteIdToUrl } from "../../../core/mappers";

@Component({
  selector: 'app-supported-emotes-lookup',
  templateUrl: './supported-emotes-lookup.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    NgSelectComponent,
    NgSelectorDirective,
    NgOptionHighlightDirective,
    ReactiveFormsModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SupportedEmotesLookupComponent),
      multi: true
    }
  ]
})
export class SupportedEmotesLookupComponent extends LookupBaseComponent<string> {
  readonly #client = inject(EmoteClient);

  guildId = input.required<string>();
  emotesLookup$ = computed(() => this.#client.getSupportedEmotesList(this.guildId()));

  mapRowLabel(value: string): string {
    return mapEmoteIdToName(value) ?? '-';
  }

  mapRowImageUrl(value: string): string {
    return mapEmoteIdToUrl(value);
  }
}
