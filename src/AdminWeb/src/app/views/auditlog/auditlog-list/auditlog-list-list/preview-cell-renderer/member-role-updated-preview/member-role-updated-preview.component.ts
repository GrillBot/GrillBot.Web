import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";
import { BadgeComponent } from "@coreui/angular";
import { DictToListPipe } from "../../../../../../core/pipes";

@Component({
  selector: 'app-member-role-updated-preview',
  templateUrl: './member-role-updated-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    UserLookupPipe,
    AsyncPipe,
    BadgeComponent,
    DictToListPipe
  ]
})
export class MemberRoleUpdatedPreviewComponent {
  preview = input.required<any>();
}
