import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";
import { SpacedNumberPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-user-joined-preview',
  templateUrl: './user-joined-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    SpacedNumberPipe
  ]
})
export class UserJoinedPreviewComponent {
  preview = input.required<any>();
}
