import { Component, computed, input } from "@angular/core";
import { CheckboxComponent, InfoRowComponent } from "../../../../../../components";
import { AsReadonlyFormControlPipe } from "../../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-interaction-command-preview',
  templateUrl: './interaction-command-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule
  ]
})
export class InteractionCommandPreviewComponent {
  preview = input.required<any>();

  commandErrorText = computed(() => {
    if (this.preview().isSuccess) {
      return null;
    }

    switch (this.preview().commandError) {
      case 0: return `Neznámý příkaz`;
      case 1: return `Selhalo načtení parametrů`;
      case 2: return `Chybné parametry`;
      case 3: return `Aplikační chyba`;
      case 4: return `Neúspěšně zpracováno`;
      case 5: return `Nesplňuje podmínky`;
      case 6: return `Příkaz nelze načíst`;
      default: return `Neznámá chyba (${this.preview().commandError})`;
    }
  });
}
