import { Component, input } from "@angular/core";
import { ColComponent, RowComponent, TableDirective } from "@coreui/angular";
import { Detail } from "../../../../core/models/audit-log";
import { InfoRowComponent, RoleLookupPipe, UserLookupPipe } from "../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-overwrite-updated',
  templateUrl: './overwrite-updated.component.html',
  standalone: true,
  imports: [
    TableDirective,
    RowComponent,
    ColComponent,
    InfoRowComponent,
    RoleLookupPipe,
    AsyncPipe,
    UserLookupPipe
  ]
})
export class OverwriteUpdatedComponent {
  detail = input.required<Detail>();
}
