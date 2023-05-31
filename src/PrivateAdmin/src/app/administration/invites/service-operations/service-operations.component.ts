import { Observable } from 'rxjs';
import { InviteNavigation } from './../navigation';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from './../../../shared/navigation/navigation';
import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/core/services/invite.service';
import { RefreshCacheModalComponent } from '../modals/refresh-cache-modal/refresh-cache-modal.component';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { CustomComponentModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-service-operations',
    templateUrl: './service-operations.component.html'
})
export class ServiceOperationsComponent implements OnInit {
    navigation: INavigation;

    metadataCount: Observable<number>;

    constructor(
        route: ActivatedRoute,
        private inviteService: InviteService,
        private modalBox: ModalBoxService
    ) {
        this.navigation = new InviteNavigation(route);
    }

    ngOnInit(): void {
        this.metadataCount = this.inviteService.getCurrentMetadataCount();
    }

    refreshMetadataCache(): void {
        this.inviteService.refreshMetadataCache().subscribe(report => {
            const modal = new CustomComponentModal('Obnovení cache metadat', RefreshCacheModalComponent, null, report);
            this.modalBox.show(modal);
        });
    }
}
