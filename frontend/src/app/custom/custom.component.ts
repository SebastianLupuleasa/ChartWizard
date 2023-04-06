import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  ChartType,
  registerables,
} from 'node_modules/chart.js';
import { HttpClient} from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth.service';
import { ngxCsv } from 'ngx-csv';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedChartDialogComponent } from '../shared-chart-dialog/shared-chart-dialog.component';
import { ChartCreatedSuccessComponent } from '../chart-created-success/chart-created-success.component';
import { ChartSharedSuccessComponent } from '../chart-shared-success/chart-shared-success.component';
import { ErrorDialogComponentComponent } from '../error-dialog-component/error-dialog-component.component';

export interface MyChart {
  id: number;
  chartTitle: string;
  chartSubtitle: string;
  chartBackgroundColor: string;
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
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit, AfterViewChecked {

  headers = { 'content-type': 'application/json'}  
  PATH_URL: string = "http://localhost:9001/";
  customCharts: MyChart[] = [];
  chart!: Chart;
  chartsFound: string = "";
  

  constructor(private httpclient: HttpClient,public dialog: MatDialog,private httpClient: HttpClient, private userAuthService: UserAuthService, private router: Router) {}

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
        if(this.customCharts.length === 0){
          this.chartsFound = "No charts were found!";
        }
      },);
  }

  createChart(): void {
    if (!this.chart && this.customCharts.length > 0) {
      this.chartsFound="";
      let horizontalFlag = false;
      this.customCharts.forEach(element => {
      Chart.register(...registerables);

      let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];
      
      let datasetsNumber = element.chartDatasets.length;

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

    let myType =  element.type;

    if(element.type === "bar-horizontal" && datasetsNumber>1){
       horizontalFlag = true;
       myType = 'bar';
    }   

    chartDatasets.push(  {
       type: myType,
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

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart: { width?: any; height?: any; ctx?: any; }, args: any, options: { color: string; }) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = element.chartBackgroundColor || 'rgb(255,255,255)';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };


    let config: ChartConfiguration;

    if(element.chartType === 'bar-horizontal')
    {
      element.chartAnimation='none';
    }
    
    if(element.chartAnimation === 'none' || element.chartAnimation === '' || element.chartAnimation === null || element.chartAnimation === undefined )
    {

    if(element.chartType === 'bar-horizontal')
{
  config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
     aspectRatio: 2,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
            display: true,
            text:element.chartTitle
        },
        subtitle: {
          display: true,
            text:element.chartSubtitle
        }            
      }
     },
     plugins: [plugin],
  };
}
else{
    config = {
        type: chartType,
        data: data,
        options: {
          aspectRatio: 2,
          plugins: {
            title: {
                display: true,
                text:element.chartTitle
            },
            subtitle: {
              display: true,
                text:element.chartSubtitle
            }            
          }
         },
         plugins: [plugin],
      };
    }
    }
    else {

      let chartAnimation : any = element.animation;

      config = {
        type: chartType,
        data: data,
        options:   {
          aspectRatio: 2
          ,animations: {
          tension: {
            duration: 1000,
            easing: chartAnimation,
            from: 1,
            to: 0,
            loop: true
          }
        },
        plugins: {
          title: {
              display: true,
              text:element.chartTitle
          },
          subtitle: {
            display: true,
              text:element.chartSubtitle
          },            
        }},
        plugins: [plugin],
      };    
    }

    if(horizontalFlag)
    {
      config = {
        type: 'line',
        data: data,
        options: {
          indexAxis: 'y',
         aspectRatio: 2,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
                display: true,
                text:element.chartTitle
            },
            subtitle: {
              display: true,
                text:element.chartSubtitle
            }            
          }
         },
         plugins: [plugin],
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

  deleteChart( elementId: number) : void {

    this.httpClient
    .delete<any>(this.PATH_URL + 'charts/delete',{params: {
      chartId:Number(elementId)
    }})
    .subscribe(data => {
      window.location.reload();
    },(err: any) => {
      if(err != "It's fine."){
      this.dialog.open(ErrorDialogComponentComponent);
      }else
      {
        window.location.reload();
      }
      });
  }
  
  hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  openLink(element: MyChart){

    this.router.navigate(['/fullscreen']);
  
    localStorage.setItem("fullscreenChart", JSON.stringify(element));
    }

    shareChart(chart: MyChart): void {
      const dialogRef = this.dialog.open(SharedChartDialogComponent, {
        });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined)
       {       
      this.httpClient
      .post<any>(this.PATH_URL + 'charts/share',{chartId:Number(chart.id),email:result})
      
      .subscribe((response) => {
        this.dialog.open(ChartSharedSuccessComponent);  
        
       },(err: any) => {
        if(err != "It's fine."){
        this.dialog.open(ErrorDialogComponentComponent);
        }else
        {
          this.dialog.open(ChartSharedSuccessComponent);
        }
        });

      }});
}}
