import { Observable } from 'rxjs';
import { InviteNavigation } from './../navigation';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from './../../../shared/navigation/navigation';
import { Component, OnInit } from '@angular/core';
import { InviteService } from 'src/app/core/services/invite.service';
import { ModalService } from 'src/app/shared/modal';
import { RefreshCacheModalComponent } from '../modals/refresh-cache-modal/refresh-cache-modal.component';

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
        private modalService: ModalService
    ) {
        this.navigation = new InviteNavigation(route);
    }

    ngOnInit(): void {
        this.metadataCount = this.inviteService.getCurrentMetadataCount();
    }

    refreshMetadataCache(): void {
        this.inviteService.refreshMetadataCache().subscribe(report => {
            const modal = this.modalService.showCustomModal<RefreshCacheModalComponent>(RefreshCacheModalComponent);
            modal.componentInstance.report = report;
        });
    }
}
