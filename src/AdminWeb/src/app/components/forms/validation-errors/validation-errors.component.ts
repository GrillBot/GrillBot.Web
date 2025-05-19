import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, input, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
  form = input<FormGroup<any>>();
  controlName = input<string>();
  formControlObject = input<FormControl<any>>();

  control = computed(() => {
    if (this.formControlObject()) {
      return this.formControlObject();
    }

    return !this.form() || !this.controlName() ? null : this.form()?.get(this.controlName() ?? '');
  });

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
