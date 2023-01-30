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
  chartAnimation: string;
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
  chartsFound: string = "No charts were found!";

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
      this.chartsFound="";
      this.customCharts.forEach(element => {
      Chart.register(...registerables);

      let chartDatasets: { label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];

      if(element.chartType === 'radar')
{
       element.chartDatasets.forEach(element => {
        let color = this.hexToRgb(element.backgroundColor);
        chartDatasets.push(  {
          label: element.label,
          backgroundColor: "rgba("+color?.r+", " + color?.g + ", "+ color?.b +", 0.2)",
          borderColor: element.borderColor,
          data: element.datasetValues,
          fill: true,
          pointBackgroundColor: element.backgroundColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: element.backgroundColor
        });
      });
    }
else if(element.chartType === 'bubble')
{
 element.chartDatasets.forEach(element => {

    let bubbleData : any[] = []; 
   
    for(let i=0; i<element.datasetValues.length; i+=3)
    {
      bubbleData.push({x:element.datasetValues[i], y:element.datasetValues[i+1], r:element.datasetValues[i+2]});
    }

    chartDatasets.push(  {
       label: element.label,
       backgroundColor: element.backgroundColor,
       borderColor: element.borderColor,
       data: bubbleData,
     });
   });
}
else if(element.chartType === 'scatter')
{
 element.chartDatasets.forEach(element => {

    let bubbleData : any[] = []; 
   
    for(let i=0; i<element.datasetValues.length; i+=2)
    {
      bubbleData.push({x:element.datasetValues[i], y:element.datasetValues[i+1]});
    }

    chartDatasets.push(  {
       label: element.label,
       backgroundColor: element.backgroundColor,
       borderColor: element.borderColor,
       data: bubbleData,
     });
   });
}
else {
  element.chartDatasets.forEach(element => {
    chartDatasets.push(  {
       label: element.label,
       backgroundColor: element.backgroundColor,
       borderColor: element.borderColor,
       data: element.datasetValues,
     });
   });
}
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
    
    if(element.chartAnimation === 'none' || element.chartAnimation === '' || element.chartAnimation === null || element.chartAnimation === undefined )
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

  downloadChart( elementId: string) : void {

    let canvas = document.getElementById(elementId) as HTMLCanvasElement;;
    let img    = canvas.toDataURL("image/png");
    let imgDownload = document.createElement('a');
    imgDownload.href = img;
    imgDownload.download = elementId+".png";
    document.body.appendChild(imgDownload);
    imgDownload.click();
    document.body.removeChild(imgDownload);
  }

  hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
