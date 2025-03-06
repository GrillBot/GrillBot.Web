import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { ColComponent, RowComponent } from "@coreui/angular";
import { AsReadonlyFormControlPipe } from "../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckboxComponent, InfoRowComponent } from "../../../../components";

@Component({
  selector: 'app-role-deleted',
  templateUrl: './role-deleted.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    InfoRowComponent
  ]
})
export class RoleDeletedComponent {
  detail = input.required<Detail>();
}
