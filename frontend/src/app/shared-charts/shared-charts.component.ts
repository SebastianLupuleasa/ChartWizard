import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, registerables, ChartType, ChartConfiguration, ChartItem } from 'chart.js';
import { ngxCsv } from 'ngx-csv';
import { ChartSharedSuccessComponent } from '../chart-shared-success/chart-shared-success.component';
import { MyChart } from '../custom/custom.component';
import { ErrorDialogComponentComponent } from '../error-dialog-component/error-dialog-component.component';
import { SharedChartDialogComponent } from '../shared-chart-dialog/shared-chart-dialog.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-shared-charts',
  templateUrl: './shared-charts.component.html',
  styleUrls: ['./shared-charts.component.scss']
})
export class SharedChartsComponent {

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
      .get<any>(this.PATH_URL + 'shared',{params: {
        userId:Number(this.userAuthService.getUserId())
      }})
      .subscribe((response) => {
        this.customCharts = response;
        if(this.customCharts.length === 0){
          this.chartsFound = "No charts were found!";
        }
      },
      (err: any) => {
        this.chartsFound = "No charts were found!";
       });
      }
      

  createChart(): void {
    if (!this.chart && this.customCharts.length > 0) {
      this.chartsFound="";
      this.customCharts.forEach(element => {
      Chart.register(...registerables);

      let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];


  element.chartDatasets.forEach(element => {
    chartDatasets.push(  {
       type: element.type,
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
        
      }

      let config: ChartConfiguration;
    
      if(element.chartAnimation === 'none' || element.chartAnimation === '' || element.chartAnimation === null || element.chartAnimation === undefined )
      {
      config = {
          type: chartType,
          data: data,
          options: {aspectRatio: 2},
        };
      }
      else {
  
        let chartAnimation : any = element.animation;
  
        config = {
          type: chartType,
          data: data,
          options:   {
            aspectRatio: 1
            ,animations: {
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


  deleteChart( elementId: number) : void {

    this.httpClient
    .post<any>(this.PATH_URL + 'charts/shared/delete',{chartId:Number(elementId),userId:this.userAuthService.getUserId()})
    
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
