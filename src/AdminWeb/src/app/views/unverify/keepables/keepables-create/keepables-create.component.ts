import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { UnverifyClient } from "../../../../core/clients";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AlertComponent, CardComponent, CardFooterComponent, ColComponent, ContainerComponent, RowComponent } from "@coreui/angular";
import { CardHeaderComponent, FormCardBodyComponent, LoadingComponent, TextInputComponent } from "../../../../components";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IForm } from "../../../../core/models/common";
import { CreateKeepableRequest } from "../../../../core/models/unverify/create-keepable-request";
import { ButtonDef } from "../../../../components/button/button.models";
import { Router, RouterLink } from "@angular/router";
import { catchError, EMPTY } from "rxjs";
import { mapHttpErrors } from "../../../../core/mappers";
import { IconComponent } from "@coreui/icons-angular";

interface CreateFormData {
  rows: IForm<CreateKeepableRequest>;
}

type CreateState = 'not-started' | 'creating' | 'created' | 'failed';

@Component({
  templateUrl: './keepables-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextInputComponent,
    ButtonComponent,
    CardComponent,
    FormCardBodyComponent,
    CardHeaderComponent,
    CardFooterComponent,
    AlertComponent,
    LoadingComponent,
    IconComponent,
    RouterLink
  ]
})
export class KeepablesCreateComponent implements OnInit {
  readonly #client = inject(UnverifyClient);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);

  state = signal<CreateState>('not-started');
  errorMessage = signal<string | null>(null);

  stateColor = computed(() => {
    switch (this.state()) {
      case 'created': return 'success';
      case 'failed': return 'danger';
      case 'creating': return 'primary';
      default: return 'transparent';
    }
  });

  form!: FormGroup<IForm<CreateFormData>>;
  canProcess = signal<boolean>(false);

  addRowButtonDef: ButtonDef = {
    id: 'add-row',
    color: 'success',
    variant: 'outline',
    icon: 'cilPlus',
    title: 'Přidat řádek',
    size: '',
    action: () => this.addRow()
  };

  deleteRowButtonDef: ButtonDef = {
    id: 'delete-row',
    color: 'danger',
    variant: 'outline',
    icon: 'cilTrash',
    action: index => this.deleteRow(index)
  };

  processCreateButtonDef: ButtonDef = {
    id: 'process-create',
    title: 'Vytvořit přístupy',
    color: 'primary',
    variant: 'outline',
    size: '',
    icon: 'cilSave',
    action: () => this.processCreate()
  };

  get rows(): AbstractControl[] {
    return (this.form.get('rows') as FormArray).controls;
  }

  ngOnInit(): void {
    this.form = this.#formBuilder.group<IForm<CreateFormData>>({
      rows: this.#formBuilder.array([])
    });

    this.addRow();
    this.form.valueChanges.subscribe(() => {
      this.canProcess.set(this.rows.every(o => o.valid));
      this.state.set('not-started');
      this.errorMessage.set(null);
    });
  }

  addRow(): void {
    const control = this.form.get('rows') as FormArray;

    control.push(this.#formBuilder.group<IForm<CreateKeepableRequest>>({
      group: this.#formBuilder.control('-', { validators: [Validators.required] }),
      name: this.#formBuilder.control('', { validators: [Validators.required] })
    }));
  }

  deleteRow(index: number): void {
    (this.form.get('rows') as FormArray).removeAt(index);
  }

  processCreate(): void {
    if (!this.canProcess()) {
      return;
    }

    this.state.set('creating');
    const requests = this.form.value.rows as CreateKeepableRequest[];

    this.#client.createKeepables(requests)
      .pipe(
        catchError(err => {
          this.errorMessage.set([...new Set(mapHttpErrors(err))].join('; '));
          this.state.set('failed');

          return EMPTY;
        })
      )
      .subscribe(res => {
        if (res.type === 'start') {
          this.state.set('creating');
          return;
        }

        this.errorMessage.set(null);
        this.state.set('created');

        setTimeout(() => this.#router.navigate(['/web/unverify/keepables']), 5000);
      });
  }
}
