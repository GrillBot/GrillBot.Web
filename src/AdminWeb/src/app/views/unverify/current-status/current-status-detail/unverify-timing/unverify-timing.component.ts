import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { DatetimeDiffPipe, LocaleDatePipe, TimeSpanPipe } from "../../../../../core/pipes";
import { AlertComponent, CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { UnverifyDetail } from "../../../../../core/models/unverify/unverify-detail";
import {
  InfoRowComponent, FormCardFooterComponent, TextInputComponent, LoadingComponent, DatetimePickerComponent
} from "../../../../../components";
import { ButtonComponent } from "../../../../../components/button/button.component";
import { ButtonDef } from "../../../../../components/button/button.models";
import { VisibilityDirective } from "../../../../../core/directives";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IForm } from "../../../../../core/models/common";
import { UnverifyClient } from "../../../../../core/clients";
import { UpdateUnverifyRequest } from "../../../../../core/models/unverify/update-unverify-request";
import { DateTime } from "luxon";
import { catchError, filter, throwError } from "rxjs";
import { IconComponent } from "@coreui/icons-angular";
import { mapParamsFromSnapshot } from "../../../../../core/mappers/router.mapper";
import { Router } from "@angular/router";

type UpdateState = 'not-started' | 'processing' | 'processed' | 'failed';

@Component({
  selector: 'app-unverify-timing',
  templateUrl: './unverify-timing.component.html',
  standalone: true,
  imports: [
    LocaleDatePipe,
    TimeSpanPipe,
    DatetimeDiffPipe,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    InfoRowComponent,
    ButtonComponent,
    VisibilityDirective,
    FormCardFooterComponent,
    TextInputComponent,
    ReactiveFormsModule,
    AlertComponent,
    LoadingComponent,
    IconComponent,
    DatetimePickerComponent
  ]
})
export class UnverifyTimingComponent implements OnInit {
  readonly #formBuilder = inject(FormBuilder);
  readonly #client = inject(UnverifyClient);
  readonly #router = inject(Router);

  detail = input.required<UnverifyDetail>();

  updateIsVisible = signal(false);
  updateForm!: FormGroup;
  updateState = signal<UpdateState>('not-started');

  updateStateColor = computed(() => {
    switch (this.updateState()) {
      case 'processed': return 'success';
      case 'failed': return 'danger';
      case 'processing': return 'primary';
      default: return 'transparent';
    }
  });

  routeParams = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root));
  guildId = computed(() => this.routeParams()['guildId'] as string);
  userId = computed(() => this.routeParams()['userId'] as string);

  modifyButtonDef: ButtonDef = {
    id: 'modify-unverify',
    title: 'Upravit',
    color: 'primary',
    size: 'lg',
    variant: 'outline',
    action: () => this.onUpdateButtonClick()
  }

  saveModifyButtonDef: ButtonDef = {
    color: 'success',
    title: 'Uložit',
    id: 'update-unverify-safe',
    variant: 'outline',
    size: '',
    action: () => this.unverifyUpdateSubmited()
  };

  ngOnInit(): void {
    const newEndAt = DateTime.fromISO(this.detail().endAtUtc).toLocal().toISO() ?? '';

    this.updateForm = this.#formBuilder.group<IForm<{
      newEndAtUtc: string | null,
      reason: string | null
    }>>({
      newEndAtUtc: this.#formBuilder.control<string | null>(newEndAt.substring(0, 16)),
      reason: this.#formBuilder.control<string | null>('', [Validators.required])
    });
  }

  private onUpdateButtonClick(): void {
    const shouldBeVisible = !this.updateIsVisible();

    this.updateIsVisible.set(shouldBeVisible);
    this.updateState.set('not-started');

    if (shouldBeVisible) {
      const newEndAt = DateTime.fromISO(this.detail().endAtUtc).toLocal().toISO() ?? '';

      this.updateForm.patchValue({
        newEndAtUtc: newEndAt.substring(0, 16),
        reason: ''
      }, { emitEvent: false });
    }
  }

  private unverifyUpdateSubmited(): void {
    for (const control of Object.values(this.updateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }

    if (this.updateForm.invalid) {
      return;
    }

    const newEndAt = DateTime.fromISO(this.updateForm.value.newEndAtUtc).toUTC().toISO();
    if (!newEndAt) return;

    const request: UpdateUnverifyRequest = {
      guildId: this.guildId(),
      userId: this.userId(),
      reason: this.updateForm.value.reason ?? '',
      newEndAtUtc: newEndAt
    };

    this.updateState.set('processing');

    this.#client.updateUnverify(request)
      .pipe(
        filter(res => res.type == 'finish'),
        catchError(err => {
          this.updateState.set('failed');
          return throwError(() => err);
        })
      )
      .subscribe(_ => {
        this.detail().endAtUtc = DateTime.fromISO(newEndAt).toUTC().toISO() ?? newEndAt;
        this.updateState.set('processed');

        setTimeout(() => this.onUpdateButtonClick(), 2500);
      });
  }
}
