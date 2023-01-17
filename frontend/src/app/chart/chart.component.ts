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
  chartDatasets: Dataset[],
  user: number;
  animation: string;
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
  PATH_URL: string = "http://localhost:9001/";

  constructor(private httpClient: HttpClient) {}

  ngAfterViewChecked(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.getChart();
  }

  getChart() {

    this.httpClient
      .get<any>(this.PATH_URL + 'charts')
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

        case 'bar':
          chartType = 'bar';
          break;
        
        case 'doughnut':
          chartType = 'doughnut';
          break;
        
        case 'polarArea':
          chartType = 'polarArea';
          break;

        case 'radar':
          chartType = 'radar';
          break;
        
        case 'bubble':
          chartType = 'bubble';
          break;
        
        case 'scatter':
          chartType = 'scatter';
          break;
      }

    let config: ChartConfiguration;

    if(element.animation === 'none' || element.animation === '')
    {
    config = {
        type: chartType,
        data: data,
        options: {},
      };
    }
    else {

      let chartAnimation : any = element.animation;

      config = {
        type: chartType,
        data: data,
        options:   {animations: {
          tension: {
            duration: 1000,
            easing: chartAnimation,
            from: 1,
            to: 0,
            loop: true
          }
        },}

      };    
    }
      const chartItem: ChartItem = document.getElementById(
        "chartDiv"+element.id
      ) as ChartItem;

      this.chart = new Chart(chartItem, config);
    }
      );}
  }

  downloadChart( elemntId: string) : void {

    console.log(elemntId);
    let canvas = document.getElementById(elemntId) as HTMLCanvasElement;;
    let img    = canvas.toDataURL("image/png");
    let imgDownload = document.createElement('a');
    imgDownload.href = img;
    imgDownload.download = elemntId+".png";
    document.body.appendChild(imgDownload);
    imgDownload.click();
    document.body.removeChild(imgDownload);
  }
}
