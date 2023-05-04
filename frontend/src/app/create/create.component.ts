import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { ChartCreatedSuccessComponent } from '../chart-created-success/chart-created-success.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  chart!: Chart;

  headers = { 'content-type': 'application/json'}  

  PATH_OF_API = "http://localhost:9001";

  backgroundColor: string ="green";

  chartForm!: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,private userAuthService:UserAuthService, private httpclient: HttpClient, public dialog: MatDialog) { 
    Chart.register(...registerables);
  }

get labels() {
  return this.chartForm.get('chartLabels') as FormArray;
}

get datasetBackground() {
  return this.chartForm.get('backgroundColor') as FormControl;
}

get datasetBorder() {
  return this.chartForm.get('borderColor') as FormControl;
}

get chartType() {
  return this.chartForm.get('chartType') as FormControl;
}

get datasetValues() {
  return this.chartForm.get('datasetValues') as FormControl;
}


  ngOnInit(): void {
    this.chartForm = this.fb.group({
      chartTitle: [''],
      chartSubtitle: [''],
      chartBackgroundColor: ['#FFFFFF'],
      chartType: ['line'],
      chartAnimation: ['none'],
      chartLabels: this.fb.array([this.fb.group({label: ['']}), this.fb.group({label: ['']})]),
      backgroundColor: [''],
      borderColor: [''],
      datasetLabel: [''],
      datasetValues: ['']
    });

    this.getChartFormChange();
  }

  addChart() {

    let chartLabelArray : String[] = [];

    interface Label {
     label: string;
    }

    interface TransformedChartDataset {
      label: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    let chartDatasetArray : TransformedChartDataset[] = [];
    
     let backgroundColor = this.chartForm.getRawValue()["backgroundColor"].split(";");

     backgroundColor.pop();

     let borderColor = this.chartForm.getRawValue()["borderColor"].split(";");

     borderColor.pop();
     let datasetValues = this.chartForm.getRawValue()["datasetValues"].split(";");

    datasetValues = datasetValues.filter((obj: string) => {return obj !== ''});
   
    chartDatasetArray.push(
         {
           label:this.chartForm.getRawValue()["datasetLabel"],
           backgroundColor:backgroundColor,
           borderColor:borderColor,
           datasetValues: datasetValues,
         }
       );
        

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"],chartSubtitle:this.chartForm.getRawValue()["chartSubtitle"],chartBackgroundColor:this.chartForm.getRawValue()["chartBackgroundColor"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
   this.httpclient.post(this.PATH_OF_API + "/charts/add",chart,{'headers':this.headers}).subscribe((res) => {

    this.dialog.open(ChartCreatedSuccessComponent);
    this.router.navigate(['custom']);

 });
  }

  addLabel() {
    this.labels.push(this.fb.group({label: ['']}));
  }

  addBackgroundColor() {
    let backgroundColorExtender = document.getElementById("backgroundColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="backgroundColorPicker";
    input.style.cssText = "width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateBackgroundColor();
  }

  calculateBackgroundColor() {
    let colorPickerList = document.getElementsByName("backgroundColorPicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetBackground.setValue("");

    for(let i=0; i<colorPickerList.length; i++){
    this.datasetBackground.setValue(this.datasetBackground.getRawValue()+colorPickerList[i].value+";");
    }
  }

  addBorderColor() {
    let backgroundColorExtender = document.getElementById("borderColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="borderColorPicker";
    input.style.cssText = "width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateBorderColor();
  }

  calculateBorderColor() {
    let colorPickerList = document.getElementsByName("borderColorPicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetBorder.setValue("");

    for(let i=0; i<colorPickerList.length; i++){
    this.datasetBorder.setValue(this.datasetBorder.getRawValue()+colorPickerList[i].value+";");
    }
  }

  addDatasetValue() {
    let datasetValueExtender = document.getElementById("datasetValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    datasetValueExtender?.appendChild(input);   
    
    this.calculateDatasetValue();
  }

  calculateDatasetValue() {
    let datasetValueList = document.getElementsByName("datasetValuePicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetValues.setValue("");

    for(let i=0; i<datasetValueList.length; i++){
    this.datasetValues.setValue(this.datasetValues.getRawValue()+datasetValueList[i].value+";");
    }
  }

  getChartFormChange()
  {
    if(this.chart)
    {
      this.chart.destroy();
    }

    let chartLabelArray : String[] = [];

    interface Label {
     label: string;
    }

    interface TransformedChartDataset {
      label: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    let chartDatasetArray : TransformedChartDataset[] = [];
    
     let backgroundColor = this.chartForm.getRawValue()["backgroundColor"].split(";");

     backgroundColor.pop();

     let borderColor = this.chartForm.getRawValue()["borderColor"].split(";");

     borderColor.pop();

    let datasetValues = this.chartForm.getRawValue()["datasetValues"].split(";");

      
    datasetValues = datasetValues.filter((obj: string) => {return obj !== ''});

   
    chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["datasetLabel"],
          backgroundColor:backgroundColor,
          borderColor:borderColor,
          datasetValues: datasetValues,
        }
      );
        

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"], chartType:this.chartForm.getRawValue()["chartType"], chartSubtitle:this.chartForm.getRawValue()["chartSubtitle"],chartBackgroundColor:this.chartForm.getRawValue()["chartBackgroundColor"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};

    this.createChart(chart);

  }

  createChart(myChart : any): void {
    if (myChart) {
     
let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];
   

if(myChart.chartType === 'radar')
{
  myChart.chartDatasets.forEach((element: { backgroundColor: any; type: any; label: any; borderColor: any; datasetValues: any; }) => {
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
else if(myChart.chartType === 'bubble')
{
  myChart.chartDatasets.forEach((element: { datasetValues: string | any[]; type: any; label: any; backgroundColor: any; borderColor: any; }) => {

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
else if(myChart.chartType === 'scatter')
{
  myChart.chartDatasets.forEach((element: { datasetValues: string | any[]; type: any; label: any; backgroundColor: any; borderColor: any; }) => {

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
myChart.chartDatasets.forEach((element: { type: any; label: any; backgroundColor: any; borderColor: any; datasetValues: any; }) => {
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
labels: myChart.chartLabels,
datasets: chartDatasets,
};

let config: ChartConfiguration;

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: { width?: any; height?: any; ctx?: any; }, args: any, options: { color: string; }) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = myChart.chartBackgroundColor || 'rgb(255,255,255)';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
  };

  if(myChart.chartType === 'bar-horizontal'){
    myChart.chartAnimation = 'none';
  }
    
    if(myChart.chartAnimation === 'none' || myChart.chartAnimation === '' || myChart.chartAnimation === null || myChart.chartAnimation === undefined )
    {
      if(myChart.chartType === 'bar-horizontal')
{
  config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
     aspectRatio: 2,
      plugins: {
        title: {
            display: true,
            text:myChart.chartTitle
        },
        subtitle: {
          display: true,
            text:myChart.chartSubtitle
        }            
      }
     },
     plugins: [plugin],
  };
}
else{
    config = {
        type: myChart.chartType,
        data: data,
        options: {
          aspectRatio: 2,
          plugins: {
            title: {
                display: true,
                text:myChart.chartTitle
            },
            subtitle: {
              display: true,
                text:myChart.chartSubtitle
            }            
          }
         },
         plugins: [plugin],
      };
    }
    }
    else {

      let chartAnimation : any = myChart.animation;

      config = {
        type: myChart.chartType,
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
              text:myChart.chartTitle
          },
          subtitle: {
            display: true,
              text:myChart.chartSubtitle
          }            
        }},
        plugins:[plugin]
      };    
    }
      const chartItem: ChartItem = document.getElementById(
        "fullscreenChart"
      ) as ChartItem;

      this.chart = new Chart(chartItem, config);

      this.chart.resize(window.innerWidth/2,window.innerHeight);
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

    addDatasetValueBubble() {
      let datasetValueExtender = document.getElementById("datasetValueExtender");
      var div = document.createElement("div");
      var div1 = document.createElement("div");
      var div2 = document.createElement("div");
      var input = document.createElement("input");
      input.type="number";
      input.name="datasetValuePicker";
      input.style.cssText = " width: 50px; margin: 5px;";
      var input1 = document.createElement("input");
      input1.type="number";
      input1.name="datasetValuePicker";
      input1.style.cssText = " width: 50px; margin: 5px;";
      var input2 = document.createElement("input");
      input2.type="number";
      input2.name="datasetValuePicker";
      input2.style.cssText = " width: 50px; margin: 5px;";

      div.innerText='x:';
      div1.innerText='y:';
      div2.innerText='r:';
      div.appendChild(input);
      div1.appendChild(input1);
      div2.appendChild(input2);

      datasetValueExtender?.appendChild(div);
      datasetValueExtender?.appendChild(div1);
      datasetValueExtender?.appendChild(div2);   
      
      this.calculateDatasetValue();
    }

    addDatasetValueScatter() {
      let datasetValueExtender = document.getElementById("datasetValueExtender");
      var div = document.createElement("div");
      var div1 = document.createElement("div");
      var input = document.createElement("input");
      input.type="number";
      input.name="datasetValuePicker";
      input.style.cssText = " width: 50px; margin: 5px;";
      var input1 = document.createElement("input");
      input1.type="number";
      input1.name="datasetValuePicker";
      input1.style.cssText = " width: 50px; margin: 5px;";
   
      div.innerText='x:';
      div1.innerText='y:';
      div.appendChild(input);
      div1.appendChild(input1);

      datasetValueExtender?.appendChild(div);
      datasetValueExtender?.appendChild(div1);
           
      this.calculateDatasetValue();
    }

}
