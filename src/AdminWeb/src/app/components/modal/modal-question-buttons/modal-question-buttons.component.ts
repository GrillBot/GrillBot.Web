import { Component, input, output } from "@angular/core";
import { ButtonDirective } from "@coreui/angular";
import { ModalComponent } from "../modal.component";

@Component({
  selector: 'app-modal-question-buttons',
  templateUrl: './modal-question-buttons.component.html',
  standalone: true,
  imports: [ButtonDirective]
})
export class ModalQuestionButtonsComponent {
  parentModal = input.required<ModalComponent>();

  confirmTitle = input<string>('Ano');
  cancelTitle = input<string>('Ne');

  onConfirm = output();
}
