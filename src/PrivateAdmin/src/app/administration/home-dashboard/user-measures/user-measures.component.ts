import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Dictionary } from 'src/app/core/models/common';
import { User } from 'src/app/core/models/users';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-user-measures',
    templateUrl: './user-measures.component.html'
})
export class UserMeasuresComponent implements OnInit {
    loading: boolean;
    items: Dictionary<User, string>;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.loading = true;
        this.items = null;

        this.dashboard.getUserMeasuresDashboard()
            .pipe(catchError(err => {
                this.items = null;
                this.loading = false;

                return throwError(() => err);
            }))
            .subscribe(items => {
                this.items = items.map(o => ({ key: this.parseUser(o.name), value: o.result }));
                this.loading = false;
                console.log(this.items);
            });
    }

    private parseUser(name: string): User {
        const user = new User();

        if (!name.startsWith('User(')) {
            user.username = name;
            return user;
        }

        const userMatch = name.match(/User\((\d+)\/(.+)\)/);

        user.username = userMatch[2];
        user.id = userMatch[1];

        return user;
    }
}
