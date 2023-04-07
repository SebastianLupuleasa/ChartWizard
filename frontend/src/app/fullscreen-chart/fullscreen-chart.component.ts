import { Component } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  ChartType,
  registerables,
} from 'node_modules/chart.js';
import { MyChart } from '../custom/custom.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-fullscreen-chart',
  templateUrl: './fullscreen-chart.component.html',
  styleUrls: ['./fullscreen-chart.component.scss']
})
export class FullscreenChartComponent {

  customChart: MyChart = JSON.parse(this.userAuthService.getFullscreen());
  chart!: Chart;

  constructor(private userAuthService:UserAuthService){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
     }

  
     createChart(): void {
      if (!this.chart && this.customChart) {

          let horizontalFlag = false;
          let datasetsNumber = this.customChart.chartDatasets.length;
      
           let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];
  
          if(this.customChart.chartType === 'radar')
  {
     this.customChart.chartDatasets.forEach(element => {
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
  else if(this.customChart.chartType === 'bubble')
  {
    this.customChart.chartDatasets.forEach(element => {
  
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
  else if(this.customChart.chartType === 'scatter')
  {
    this.customChart.chartDatasets.forEach(element => {
  
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
    this.customChart.chartDatasets.forEach(element => {

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
          labels: this.customChart.chartLabels,
          datasets: chartDatasets,
        };
        
const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: { width?: any; height?: any; ctx?: any; }, args: any, options: { color: string; }) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = this.customChart.chartBackgroundColor || 'rgb(255,255,255)';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

if(this.customChart.chartType === 'bar-horizontal'){
  this.customChart.chartAnimation = 'none';
}
  
      let config: ChartConfiguration;
      
      if(this.customChart.chartAnimation === 'none' || this.customChart.chartAnimation === '' || this.customChart.chartAnimation === null || this.customChart.chartAnimation === undefined )
      {
        if(this.customChart.chartType === 'bar-horizontal')
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
                    text:this.customChart.chartTitle
                },
                subtitle: {
                  display: true,
                    text:this.customChart.chartSubtitle
                }            
              }
             },
             plugins: [plugin],
          };
      }
      else{
        config = {
            type: this.customChart.chartType as ChartType,
            data: data,
            options: {
              aspectRatio: 2,
              plugins: {
                title: {
                    display: true,
                    text:this.customChart.chartTitle
                },
                subtitle: {
                  display: true,
                    text:this.customChart.chartSubtitle
                }            
              }
             },
             plugins: [plugin],
          };
        }
      }
      else {
  
        let chartAnimation : any = this.customChart.animation;
  
        config = {
          type: this.customChart.chartType as ChartType,
          data: data,
          options:   {animations: {
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
                text:this.customChart.chartTitle
            },
            subtitle: {
              display: true,
                text:this.customChart.chartSubtitle
            }            
          }},
          plugins:[plugin]  
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
                  text:this.customChart.chartTitle
              },
              subtitle: {
                display: true,
                  text:this.customChart.chartSubtitle
              }            
            }
           },
           plugins: [plugin],
        };  
      }

        const chartItem: ChartItem = document.getElementById(
          "fullscreenChart"
        ) as ChartItem;
  
        this.chart = new Chart(chartItem, config);
  
        this.chart.resize(window.innerWidth,window.innerHeight/1.2);
      }
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
