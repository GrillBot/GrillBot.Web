import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { AlertComponent, ColComponent, RowComponent, TableDirective } from "@coreui/angular";
import { CheckboxComponent, InfoRowComponent } from "../../../../components";
import { AsReadonlyFormControlPipe, TimeSpanPipe } from "../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-interaction-command',
  templateUrl: './interaction-command.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    InfoRowComponent,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    TimeSpanPipe,
    AlertComponent,
    TableDirective
  ]
})
export class InteractionCommandComponent {
  detail = input.required<Detail>();

  formatCommandError(value: number): string {
    switch (value) {
      case 0: return `Neznámý příkaz`;
      case 1: return `Selhalo načtení parametrů`;
      case 2: return `Chybné parametry`;
      case 3: return `Aplikační chyba`;
      case 4: return `Neúspěšně zpracováno`;
      case 5: return `Nesplňuje podmínky`;
      case 6: return `Příkaz nelze načíst`;
      default: return `Neznámá chyba (${value})`;
    }
  }
}
