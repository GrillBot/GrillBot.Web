import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, input, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet
  ]
})
export class ValidationErrorsComponent implements OnInit {
  form = input.required<FormGroup<any>>();
  controlName = input.required<string>();

  control = computed(() => this.form().get(this.controlName()));

  hasAnyError: boolean = false;
  errors: string[][] = [];

  ngOnInit(): void {
    this.control()?.statusChanges.subscribe(() => {
      const errors = this.control()?.errors ?? {};

      this.errors = Object.keys(errors).map(k => [k, errors[k]]);
      this.hasAnyError = this.errors.length > 0;
    });
  }
}
