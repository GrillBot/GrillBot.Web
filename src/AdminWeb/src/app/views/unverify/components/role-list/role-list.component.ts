import { Component, input } from "@angular/core";
import { RoleLookupPipe } from "../../../../components";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  standalone: true,
  imports: [
    RoleLookupPipe,
    AsyncPipe
  ]
})
export class RoleListComponent {
  roles = input.required<string[]>();
  title = input<string | null>(null);
}
