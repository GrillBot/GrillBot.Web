import { Component, input, OnInit } from "@angular/core";
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { CardFooterComponent, FormDirective } from "@coreui/angular";
import { VisibilityDirective } from "../../../core/directives";

@Component({
  selector: 'app-form-card-footer',
  templateUrl: './form-card-footer.component.html',
  standalone: true,
  imports: [
    FormDirective,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    },
    FormGroupDirective
  ],
  host: {
    class: 'pt-2'
  },
  hostDirectives: [
    {
      directive: VisibilityDirective,
      inputs: ['isVisible: isVisible']
    }
  ]
})
export class FormCardFooterComponent extends CardFooterComponent implements OnInit {
  form = input.required<FormGroup<any>>();

  constructor(private parentForm: FormGroupDirective) { super(); }

  ngOnInit(): void {
    this.parentForm.form = this.form();
  }
}
