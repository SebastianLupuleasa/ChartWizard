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
import { ngxCsv } from 'ngx-csv';
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
  type:string;
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
  chartsFound: string = "";

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
        if(this.customCharts.length === 0){
          this.chartsFound = "No charts were found!";
        }
      });
  }

  createChart(): void {
    if (!this.chart && this.customCharts.length > 0) {
      this.chartsFound="";
      this.customCharts.forEach(element => {
      Chart.register(...registerables);

      let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];

        if(element.chartType === 'radar')
{
       element.chartDatasets.forEach(element => {
        let color = this.hexToRgb(element.backgroundColor);
        chartDatasets.push(  {
          type: element.type,
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
       type: element.type,
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

    let scatterData : any[] = []; 
   
    for(let i=0; i<element.datasetValues.length; i+=2)
    {
      scatterData.push({x:element.datasetValues[i], y:element.datasetValues[i+1]});
    }

    chartDatasets.push(  {
       type: element.type,
       label: element.label,
       backgroundColor: element.backgroundColor,
       borderColor: element.borderColor,
       data: scatterData,
     });
   });
}
else {
  element.chartDatasets.forEach(element => {
    chartDatasets.push(  {
       type: element.type,
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

  downloadCsv( element: MyChart) : void {   
    if(element.chartDatasets.length !=2){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: false,
        title: 'Exported Chart',
        useBom: true,
        noDownload: false,
        headers: ["ChartTitle", "ChartType", "ChartAnimation","ChartLabels","DatasetTitle","DatasetType","DatasetBackgroundColor","DatasetBorderColor","DatasetValues"]
      };

   new ngxCsv([[element.chartTitle,element.chartType,element.chartAnimation,element.chartLabels.toString(),element.chartDatasets[0].label,
    element.chartDatasets[0].type ,element.chartDatasets[0].backgroundColor.toString(),element.chartDatasets[0].borderColor.toString(),element.chartDatasets[0].datasetValues.join(";")]
    ], 'ExportedChart',options);}

    else {

      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: false,
        title: 'Exported Chart',
        useBom: true,
        noDownload: false,
        headers: ["ChartTitle", "ChartType", "ChartAnimation","ChartLabels","DatasetTitle","DatasetType","DatasetBackgroundColor","DatasetBorderColor","DatasetValues",
        "SecondDatasetTitle","SecondDatasetType","SecondDatasetBackgroundColor","SecondDatasetBorderColor","SecondDatasetValues"]
      };
    
      new ngxCsv([[element.chartTitle,element.chartType,element.chartAnimation,element.chartLabels.toString(),element.chartDatasets[0].label,
      element.chartDatasets[0].type ,element.chartDatasets[0].backgroundColor.toString(),element.chartDatasets[0].borderColor.toString(),element.chartDatasets[0].datasetValues.join(";")
      ,element.chartDatasets[1].label,element.chartDatasets[1].type,element.chartDatasets[1].backgroundColor.toString(),element.chartDatasets[1].borderColor.toString(),element.chartDatasets[1].datasetValues.join(";")]], 'ExportedChart',options);}
    
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
