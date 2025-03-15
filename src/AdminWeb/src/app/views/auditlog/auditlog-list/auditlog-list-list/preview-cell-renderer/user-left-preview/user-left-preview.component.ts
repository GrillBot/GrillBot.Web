import { Component, input } from "@angular/core";
import { InfoRowComponent, UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";
import { SpacedNumberPipe } from "../../../../../../core/pipes";
import { BadgeComponent } from "@coreui/angular";

@Component({
  selector: 'app-user-left-preview',
  templateUrl: './user-left-preview.component.html',
  standalone: true,
  imports: [
    UserLookupPipe,
    AsyncPipe,
    InfoRowComponent,
    SpacedNumberPipe,
    BadgeComponent
  ]
})
export class UserLeftPreviewComponent {
  preview = input.required<any>();
}
