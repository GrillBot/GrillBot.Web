import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';
import { ServiceInfo } from 'src/app/core/models/services/services';

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
    request$: Observable<ServiceInfo>;

    constructor(
        private service: SystemService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id as string;
        this.request$ = this.service.getServiceInfo(id);
    }

}
