/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { UserMeasuresNavigation } from '../navigation';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { CreateUserMeasuresWarningParams } from 'src/app/core/models/user-measures';
import { UserMeasuresService } from 'src/app/core/services/user-measures.service';
import { InfoModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-create-warning',
    templateUrl: './create-warning.component.html'
})
export class CreateWarningComponent implements OnInit {
    navigation: INavigation;
    form: UntypedFormGroup;

    constructor(
        route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private userMeasuresService: UserMeasuresService,
        private modalBox: ModalBoxService,
        private router: Router
    ) {
        this.navigation = new UserMeasuresNavigation(route);
    }

    get validationHelper(): typeof ValidationHelper { return ValidationHelper; }

    ngOnInit(): void {
        this.form = this.fb.group({
            guildId: [null, Validators.required],
            userId: [null, Validators.required],
            message: [null, Validators.required]
        });
    }

    submitForm(): void {
        if (!this.form.dirty || this.form.invalid) {
            return;
        }

        const formData = this.form.value;
        const parameters = new CreateUserMeasuresWarningParams(formData.guildId, formData.userId, formData.message);

        this.userMeasuresService.createUserMeasuresWarning(parameters).subscribe(() => {
            const infoModal = new InfoModal('Zápis varování', 'Varování bylo úspěšně zapsáno.');
            infoModal.onClose.subscribe(() => {
                this.router.navigate(['/admin/userMeasures']);
            });

            this.modalBox.show(infoModal);
        });
    }
}
