import { Directive } from "@angular/core";
import { ModalComponent } from "@coreui/angular";
import * as rxjs from 'rxjs';

@Directive()
export abstract class ComponentBase {
  openModal(
    modal?: ModalComponent,
    beforeOpen: (() => void) | null = null,
    afterClose: (() => void) | null = null
  ) {
    if (!modal) {
      return;
    }

    if (beforeOpen) {
      beforeOpen();
    }

    modal.visible = true;

    if (afterClose) {
      const visibleChange = modal.visibleChange
        .pipe(rxjs.filter(visible => !visible))
        .subscribe(() => {
          afterClose();
          visibleChange.unsubscribe();
        })
    }
  }
}
