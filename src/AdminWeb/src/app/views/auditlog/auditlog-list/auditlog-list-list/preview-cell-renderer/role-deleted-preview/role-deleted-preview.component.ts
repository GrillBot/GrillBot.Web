import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { InfoRowComponent } from "../../../../../../components";

@Component({
  selector: 'app-role-deleted-preview',
  templateUrl: './role-deleted-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoRowComponent
  ]
})
export class RoleDeletedPreviewComponent {
  preview = input.required<any>();
}
