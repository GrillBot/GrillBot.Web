import { Component, input } from "@angular/core";
import { CheckboxComponent, InfoRowComponent } from "../../../../../../components";
import { AsReadonlyFormControlPipe, SpacedNumberPipe } from "../../../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component( {
  selector: 'app-manualremove-preview',
  templateUrl: './manualremove-preview.component.html',
  standalone: true,
  imports: [
    InfoRowComponent,
    SpacedNumberPipe,
    CheckboxComponent,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule
  ]
})
export class ManualremovePreviewComponent {
  preview = input.required<any>();
}
