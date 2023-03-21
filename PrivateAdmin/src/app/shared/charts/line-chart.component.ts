import { Dictionary } from 'src/app/core/models/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-line-chart',
    template: '<div echarts [options]="chartOptions"></div>'
})
export class LineChartComponent {
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
                    type: 'line',
                    data: this.data ? this.data.map(o => o.value) : []
                }
            ],
            tooltip: {
                trigger: 'axis'
            }
        };
    }
}
