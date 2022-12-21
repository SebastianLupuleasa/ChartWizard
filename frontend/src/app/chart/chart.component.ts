import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  ChartType,
  registerables,
} from 'node_modules/chart.js';

export interface MyChart {
  id: number;
  chartTitle: string;
  chartType: string;
  chartLabels: string[];
  chartDatasets: Dataset[];
}

export interface Dataset {
  id: number;
  label: string;
  backgroundColor: string;
  borderColor: string;
  datasetValues: number[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewChecked {
  customCharts: MyChart[] = [];
  chart!: Chart;

  constructor(private httpClient: HttpClient) {}

  ngAfterViewChecked(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.getChart();
  }

  getChart() {
    this.httpClient
      .get<any>('http://localhost:9001/charts')
      .subscribe((response) => {
        this.customCharts = response;
      });
  }

  createChart(): void {
    if (!this.chart && this.customCharts.length > 0) {
      this.customCharts.forEach(element => {
      Chart.register(...registerables);

      let chartDatasets: { label: string; backgroundColor: string; borderColor: string; data: number[]; }[] = [];

      element.chartDatasets.forEach(element => {
       chartDatasets.push(  {
          label: element.label,
          backgroundColor: element.backgroundColor,
          borderColor: element.borderColor,
          data: element.datasetValues,
        });
      });

      const data = {
        labels: element.chartLabels,
        datasets: chartDatasets,
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
            display: false,
          },
        },
      };

      let chartType : ChartType = 'line';

      switch(element.chartType){

        case 'line':
          chartType = 'line';
          break;

        case 'pie':
          chartType = 'pie';
          break;
      }

      const config: ChartConfiguration = {
        type: chartType,
        data: data,
        options: options,
      };

      const chartItem: ChartItem = document.getElementById(
        "chartDiv"+element.id
      ) as ChartItem;

      this.chart = new Chart(chartItem, config);
    }
      );}
  }
}
