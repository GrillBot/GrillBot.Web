import { LineChartComponent } from './line-chart.component';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
    imports: [
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    declarations: [
        LineChartComponent,
        BarChartComponent
    ],
    exports: [
        LineChartComponent,
        BarChartComponent
    ]
})
export class ChartsModule { }
