/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { PointsService } from 'src/app/core/services/points.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-transfer-points',
    templateUrl: './transfer-points.component.html'
})
export class TransferPointsComponent implements OnInit {
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
            fromUserId: [null, Validators.required],
            toUserId: [null, Validators.required],
            amount: [null, Validators.compose([Validators.required, ValidationHelper.nonZeroNumber()])]
        });
    }

    submitForm(): void {
        if (this.form.invalid) { return; }

        const value = this.form.value;
        this.modal.showQuestion('Převod bodů', 'Opravdu si přejete převést body?').onAccept.subscribe(() => {
            this.pointsService.serviceTransferPoints(value.guildId, value.fromUserId, value.toUserId, value.amount).subscribe(() => {
                this.modal.showNotification('Převod bodů', 'Body byly úspěšně převedeny.');
            });
        });
    }
}
