import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
  CardHeaderComponent, CheckboxComponent, FilterBaseComponent, FilterButtonsComponent, FilterStoreComponent,
  FormCardBodyComponent, GuildLookupComponent, UserLookupComponent, ValidationErrorsComponent
} from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { InviteListRequest } from "../../../../core/models/invite";
import { Component } from "@angular/core";
import { CardComponent, CardFooterComponent, ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-invites-list-filter',
  templateUrl: './invites-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    FormCardBodyComponent,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    FormControlDirective,
    GuildLookupComponent,
    UserLookupComponent,
    ValidationErrorsComponent,
    FilterButtonsComponent,
    CheckboxComponent,
    CardFooterComponent,
    FilterStoreComponent,
    InputGroupComponent
  ]
})
export class InvitesListFilterComponent extends FilterBaseComponent<InviteListRequest> {
  override configure(): void {
    this.filterId = 'invite/invites-list';
  }

  override createForm(): IForm<InviteListRequest> {
    const creatorId = this.createControl();
    const onlyWithoutCreator = this.createControl({ validators: [] }, false);

    onlyWithoutCreator.valueChanges.subscribe(value => {
      if (value) {
        creatorId.setValue(null);
        creatorId.disable();
      } else {
        creatorId.enable();
      }
    });

    return {
      guildId: this.createControl(),
      creatorId: creatorId,
      onlyWithoutCreator: onlyWithoutCreator,
      code: this.createControl({
        validators: [
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          Validators.maxLength(10)
        ]
      }, null),
      createdFrom: this.createControl(),
      createdTo: this.createControl()
    };
  }

}
