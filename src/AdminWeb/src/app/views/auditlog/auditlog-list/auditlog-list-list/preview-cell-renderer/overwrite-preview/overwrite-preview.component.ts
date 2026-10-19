import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { InfoRowComponent, RoleLookupPipe, UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-overwrite-preview',
  templateUrl: './overwrite-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    InfoRowComponent,
    RoleLookupPipe,
    UserLookupPipe,
    AsyncPipe
  ]
})
export class OverwritePreviewComponent {
  preview = input.required<any>();
}
