import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { ColComponent, RowComponent, TableDirective } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent, UserLookupPipe } from "../../../../components";
import { AsyncPipe } from "@angular/common";
import { AsBitmaskStringPipe, AsReadonlyFormControlPipe } from "../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-member-updated',
  templateUrl: './member-updated.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    UserLookupPipe,
    AsyncPipe,
    TableDirective,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    CheckboxComponent,
    AsBitmaskStringPipe
  ]
})
export class MemberUpdatedComponent {
  detail = input.required<Detail>();
}
