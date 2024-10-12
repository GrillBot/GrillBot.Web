import { AsyncPipe } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { WithLoadingPipe } from "../../../core/pipes";
import { NgOptionTemplateDirective, NgSelectComponent } from "@ng-select/ng-select";
import { NgSelectorDirective } from "../../../core/directives";
import { NgOptionHighlightDirective } from "@ng-select/ng-option-highlight";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { IconDirective } from "@coreui/icons-angular";
import { LookupBaseComponent } from "../lookup.component.base";

@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    NgSelectComponent,
    NgSelectorDirective,
    NgOptionHighlightDirective,
    ReactiveFormsModule,
    NgOptionTemplateDirective,
    IconDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserLookupComponent),
      multi: true
    }
  ]
})
export class UserLookupComponent extends LookupBaseComponent<string> {
  userLookup$ = this.lookupClient.resolveUserList();
}
