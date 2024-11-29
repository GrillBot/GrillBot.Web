import { Component, input, OnInit } from "@angular/core";
import { CardBodyComponent, FormDirective } from "@coreui/angular";
import { VisibilityDirective } from "../../../core/directives";
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-form-card-body',
  templateUrl: './form-card-body.component.html',
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
      inputs: ['isVisibleBy: header']
    }
  ]
})
export class FormCardBodyComponent extends CardBodyComponent implements OnInit {
  form = input.required<FormGroup<any>>();

  constructor(private parentForm: FormGroupDirective) { super(); }

  ngOnInit(): void {
    this.parentForm.form = this.form();
  }
}
