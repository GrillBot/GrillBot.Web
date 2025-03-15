import { Component, input } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-role-deleted-preview',
  templateUrl: './role-deleted-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent
  ]
})
export class RoleDeletedPreviewComponent {
  preview = input.required<any>();
}
