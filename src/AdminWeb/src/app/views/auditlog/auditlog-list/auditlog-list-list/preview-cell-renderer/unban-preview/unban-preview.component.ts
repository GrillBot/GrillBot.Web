import { Component, input } from "@angular/core";
import { UserLookupPipe } from "../../../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-unban-preview',
  templateUrl: './unban-preview.component.html',
  standalone: true,
  imports: [
    UserLookupPipe,
    AsyncPipe
  ]
})
export class UnbanPreviewComponent {
  preview = input.required<any>();
}
