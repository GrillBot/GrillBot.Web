import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component } from "@angular/core";
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent,
  FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent,
  TextColorDirective
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    NgTemplateOutlet
  ]
})
export class LoginComponent {
}
