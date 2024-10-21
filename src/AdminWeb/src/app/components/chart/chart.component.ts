import { Component, computed, input, Signal } from "@angular/core";
import { map, Observable } from "rxjs";
import { RawHttpResponse } from "../../core/models/common";
import { CardBodyComponent, CardComponent, CardTitleDirective, Colors } from "@coreui/angular";
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData, ChartOptions, ChartType } from "chart.js";
import { WithLoadingPipe } from "../../core/pipes";
import { AsyncPipe } from "@angular/common";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    ChartjsComponent,
    WithLoadingPipe,
    AsyncPipe,
    LoadingComponent
  ]
})
export class ChartComponent {
  title = input.required<string>();
  source = input.required<Observable<RawHttpResponse<any[]>> | null>();
  bindValue = input.required<string>();
  bindLabel = input.required<string>();
  type = input<ChartType>('line');
  color = input<Colors>('primary');

  source$ = computed(() => {
    const source = this.source();
    if (!source) { return null; }

    return source.pipe(map(data => {
      return {
        type: data.type,
        value: this.mapChartData(data)
      };
    }));
  });

  colorCode = computed(() => {
    const color = this.color();
    switch (color) {
      case 'primary': return '#5856D6';
      case 'secondary': return '#6B7785';
      case 'success': return '#1B9E3E';
      case 'danger': return '#E55353';
      case 'warning': return '#F9B115';
      case 'info': return '#39F';
      case 'dark': return '#212631';
      case 'light': return '#F3F4F7';
      default: return color;
    }
  });

  options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  private mapChartData(response: RawHttpResponse<any[]>): ChartData | undefined {
    if (response.type === 'start') {
      return undefined;
    }

    return {
      labels: response.value?.map(item => String(item[this.bindLabel()]))!,
      datasets: [
        {
          data: response.value?.map(item => Number(item[this.bindValue()]))!,
          borderColor: this.colorCode(),
          backgroundColor: this.colorCode()
        }
      ]
    };
  }
}
