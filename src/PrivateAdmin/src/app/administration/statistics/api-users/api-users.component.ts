import { Component, OnInit } from '@angular/core';
import { Dictionary, List } from 'src/app/core/models/common';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-api-users',
    templateUrl: './api-users.component.html',
    styleUrls: ['./api-users.component.scss']
})
export class ApiUsersComponent implements OnInit {
    rows: Dictionary<string, List<string>>;
    columns: List<string>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.service.getUserApiStatistics().subscribe(data => {
            this.columns = [...new Set(data.map(o => o.username))];

            const rowKeys = new Set(data.map(o => o.action));
            this.rows = [...rowKeys].map(o => ({ key: o, value: new Array(this.columns.length).fill('') }));

            for (const item of data) {
                const cellIndex = this.columns.findIndex(o => o === item.username);
                const row = this.rows.find(o => o.key === item.action);

                row.value[cellIndex] = item.count.toLocaleString();
            }
        });
    }
}
