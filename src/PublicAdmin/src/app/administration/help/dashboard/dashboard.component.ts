import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { CommandGroup } from 'src/app/core/models/help';
import { ObservableList } from 'src/app/core/models/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    groups: ObservableList<CommandGroup>;
    currentService: string;

    constructor(
        private usersService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.currentService = params.service as string;
            this.groups = this.usersService.getCommandsOfService(this.currentService);
        });
    }

}
