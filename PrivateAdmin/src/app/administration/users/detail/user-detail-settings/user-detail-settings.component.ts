/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdateUserParams, UserDetail } from 'src/app/core/models/users';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-user-detail-settings',
    templateUrl: './user-detail-settings.component.html',
    styleUrls: ['./user-detail-settings.component.scss']
})
export class UserDetailSettingsComponent implements OnInit {
    @Input() user: UserDetail;
    @Output() userUpdated = new EventEmitter<UserDetail>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private modalService: ModalService
    ) { }

    get isCurrentUser(): boolean { return this.authService.currentToken.jwt.id === this.user.id; }

    ngOnInit(): void {
        this.form = this.fb.group({
            botAdmin: [this.user.isBotAdmin],
            note: [this.user.note],
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
            this.form.value.note,
            this.isCurrentUser || this.user.isBot ? this.user.haveWebAdmin : this.form.value.webAdmin,
            this.form.value.selfUnverifyMinimalTime,
            this.form.value.commandsDisabled,
            this.form.value.pointsDisabled
        );

        this.userService.updateUser(this.user.id, params).subscribe(_ => {
            this.modalService.showNotification('Nastavení uživatele', 'Nastavení uživatele byla úspěšně změněna.')
                .onClose.subscribe(__ => this.userUpdated.emit());
        });
    }
}
