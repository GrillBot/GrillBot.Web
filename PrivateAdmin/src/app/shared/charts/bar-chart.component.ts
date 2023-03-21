import { Component, Input } from '@angular/core';
import { Dictionary } from 'src/app/core/models/common';

@Component({
    selector: 'app-bar-chart',
    template: '<div echarts [options]="chartOptions"></div>'
})
export class BarChartComponent {
    @Input() data: Dictionary<string, number>;

    get chartOptions(): any {
        return {
            grid: {
                show: true,
                left: 50,
                top: 20,
                right: 20,
                bottom: 50
            },
            xAxis: {
                type: 'category',
                data: this.data ? this.data.map(o => o.key) : [],
                splitLine: { show: true }
            },
            yAxis: {
                type: 'value',
                splitLine: { show: true }
            },
            series: [
                {
                    type: 'bar',
                    data: this.data ? this.data.map(o => o.value) : []
                }
            ],
            tooltip: {
                trigger: 'axis'
            }
        };
    }
}
