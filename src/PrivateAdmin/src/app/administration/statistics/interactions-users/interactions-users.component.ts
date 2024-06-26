import { Component, OnInit } from '@angular/core';
import { Dictionary, List } from 'src/app/core/models/common';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { NumberWithSpacesPipe } from 'src/app/shared/pipes/spaced-number.pipe';

@Component({
    selector: 'app-interactions-users',
    templateUrl: './interactions-users.component.html',
    styleUrls: ['./interactions-users.component.scss']
})
export class InteractionsUsersComponent implements OnInit {
    rows: Dictionary<string, List<string>>;
    columns: List<string>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        const formatter = new NumberWithSpacesPipe();

        this.service.getUserCommandStatistics().subscribe(data => {
            this.columns = [...new Set(data.map(o => o.action))];

            const rowKeys = new Set(data.map(o => o.username));
            this.rows = [...rowKeys].map(o => ({ key: o, value: new Array(this.columns.length).fill('') }));

            for (const item of data) {
                const cellIndex = this.columns.findIndex(o => o === item.action);
                const row = this.rows.find(o => o.key === item.username);

                row.value[cellIndex] = formatter.transform(item.count);
            }
        });
    }

}
