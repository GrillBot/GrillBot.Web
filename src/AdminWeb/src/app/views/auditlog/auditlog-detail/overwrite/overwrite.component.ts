import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { ColComponent, RowComponent } from "@coreui/angular";
import { InfoRowComponent, RoleLookupPipe, UserLookupPipe } from "../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-overwrite',
  templateUrl: './overwrite.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    RoleLookupPipe,
    UserLookupPipe,
    AsyncPipe
  ]
})
export class OverwriteComponent {
  detail = input.required<any>();
}
