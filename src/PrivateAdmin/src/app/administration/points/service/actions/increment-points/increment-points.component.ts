/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal';
import { PointsService } from 'src/app/core/services/points.service';
import { ValidationHelper } from 'src/app/core/lib/validators';

@Component({
    selector: 'app-increment-points',
    templateUrl: './increment-points.component.html'
})
export class IncrementPointsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modal: ModalService,
        private pointsService: PointsService
    ) { }

    get guildId(): string { return this.form.get('guildId').value as string; }

    ngOnInit(): void {
        this.form = this.fb.group({
            guildId: [null, Validators.required],
            toUserId: [null, Validators.required],
            amount: [null, Validators.compose([Validators.required, ValidationHelper.nonZeroNumber()])]
        });
    }

    submitForm(): void {
        if (this.form.invalid) { return; }

        const value = this.form.value;
        this.modal.showQuestion('Udělit bonusové body', 'Opravdu si přejete udělit bonusové body?').onAccept.subscribe(() => {
            this.pointsService.serviceIncrementPoints(value.guildId, value.toUserId, value.amount).subscribe(() => {
                this.modal.showNotification('Udělit bonusové body', 'Body byly úspěšně uděleny.');
            });
        });
    }
}
