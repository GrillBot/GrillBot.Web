import { Component, input, signal, TemplateRef } from "@angular/core";
import { ButtonDirective, CardTitleDirective, CardHeaderComponent as OriginalCardHeader } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  standalone: true,
  imports: [
    IconDirective,
    CardTitleDirective,
    ButtonDirective
  ]
})
export class CardHeaderComponent extends OriginalCardHeader {
  icon = input<string>();
  title = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  hideToggleVisibility = input<boolean>();
  bodyVisible = signal(true);
}
