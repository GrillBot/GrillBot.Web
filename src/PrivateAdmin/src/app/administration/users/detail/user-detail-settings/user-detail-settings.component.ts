/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdateUserParams, UserDetail } from 'src/app/core/models/users';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { InfoModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-user-detail-settings',
    templateUrl: './user-detail-settings.component.html',
    styleUrls: ['./user-detail-settings.component.scss']
})
export class UserDetailSettingsComponent implements OnInit {
    @Input() user: UserDetail;
    @Output() userUpdated = new EventEmitter<UserDetail>();

    form: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private modalBox: ModalBoxService
    ) { }

    get isCurrentUser(): boolean { return this.authService.currentToken.jwt.id === this.user.id; }

    ngOnInit(): void {
        this.form = this.fb.group({
            botAdmin: [this.user.isBotAdmin],
            webAdmin: [this.user.haveWebAdmin],
            selfUnverifyMinimalTime: [this.user.selfUnverifyMinimalTime],
            commandsDisabled: [this.user.commandsDisabled],
            pointsDisabled: [this.user.pointsDisabled]
        });

        if (this.isCurrentUser || this.user.isBot) {
            this.form.get('botAdmin').disable();
            this.form.get('webAdmin').disable();
            this.form.get('commandsDisabled').disable();
            this.form.get('pointsDisabled').disable();
        }
    }

    submitForm(): void {
        const params = new UpdateUserParams(
            this.isCurrentUser || this.user.isBot ? this.user.isBotAdmin : this.form.value.botAdmin,
            this.isCurrentUser || this.user.isBot ? this.user.haveWebAdmin : this.form.value.webAdmin,
            this.form.value.selfUnverifyMinimalTime,
            this.form.value.commandsDisabled,
            this.form.value.pointsDisabled
        );

        this.userService.updateUser(this.user.id, params).subscribe(_ => {
            const infoModal = new InfoModal('Nastavení uživatele', 'Nastavení uživatele byla úspěšně změněna.');
            infoModal.onClose.subscribe(() => this.userUpdated.emit());

            this.modalBox.show(infoModal);
        });
    }
}
