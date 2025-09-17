import { Component, input, viewChild } from "@angular/core";

import * as coreui from '@coreui/angular'
import { filter } from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [
    coreui.ModalComponent,
    coreui.ModalHeaderComponent,
    coreui.ModalTitleDirective,
    coreui.ButtonCloseDirective,
    coreui.ModalBodyComponent,
    coreui.ModalFooterComponent
  ]
})
export class ModalComponent {
  alignment = input<'top' | 'center'>('center');
  size = input<undefined | 'sm' | 'lg' | 'xl'>('lg');
  title = input.required<string>();
  enableFooter = input<boolean>(false);

  modal = viewChild<coreui.ModalComponent>('modal');

  open(
    beforeOpen: (() => void) | null = null,
    afterClose: (() => void) | null = null
  ) {
    const modal = this.modal();
    if (modal === undefined) {
      return;
    }

    if (beforeOpen) {
      beforeOpen();
    }

    modal.visible = true;

    if (afterClose) {
      const visibleChange = modal.visibleChange.subscribe(visible => {
        if (visible) {
          return;
        }

        afterClose();
        visibleChange.unsubscribe();
      });
    }
  }

  close() {
    const modal = this.modal();
    if (modal) {
      modal.visible = false;
    }
  }
}
