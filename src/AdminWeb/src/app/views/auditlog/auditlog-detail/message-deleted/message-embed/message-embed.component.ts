import { Component, input } from "@angular/core";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent } from "../../../../../components";
import { AsReadonlyFormControlPipe } from "../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-message-embed',
  templateUrl: './message-embed.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    InfoRowComponent,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    RowComponent,
    ColComponent,
    ReactiveFormsModule,
    TableDirective
  ]
})
export class MessageEmbedComponent {
  embed = input.required<any>();
}
