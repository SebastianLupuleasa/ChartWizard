import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MyChart } from '../chart/chart.component';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  ChartType,
  registerables,
} from 'node_modules/chart.js';
import { HttpClient} from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit, AfterViewChecked {

  PATH_URL: string = "http://localhost:9001/";
  customCharts: MyChart[] = [];
  chart!: Chart;

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {}

  ngAfterViewChecked(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.getChart();
  }

  getChart() {

    this.httpClient
      .get<any>(this.PATH_URL + 'custom',{params: {
        userId:Number(this.userAuthService.getUserId())
      }})
      .subscribe((response) => {
        this.customCharts = response;
        console.log(response);
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
