import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartConfiguration, ChartItem, Chart, registerables } from 'chart.js';
import { ChatEditedSuccessComponent } from '../chat-edited-success/chat-edited-success.component';
import { MyChart } from '../custom/custom.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-edit-chart',
  templateUrl: './edit-chart.component.html',
  styleUrls: ['./edit-chart.component.scss']
})
export class EditChartComponent {

  editedChart!: MyChart;
  chartForm!: FormGroup;
  chart!: Chart;

  get labels() {
    return this.chartForm.get('chartLabels') as FormArray;
  }
  
  get datasetBackground() {
    return this.chartForm.get('backgroundColor') as FormControl;
  }

  get chartType() {
    return this.chartForm.get('chartType') as FormControl;
  }
  
  get datasetBorder() {
    return this.chartForm.get('borderColor') as FormControl;
  }
  
  get datasetValues() {
    return this.chartForm.get('datasetValues') as FormControl;
  }

  get datasetSecondBackground() {
    return this.chartForm.get('secondBackgroundColor') as FormControl;
  }
  
  get datasetSecondBorder() {
    return this.chartForm.get('secondBorderColor') as FormControl;
  }
  
  get datasetSecondValues() {
    return this.chartForm.get('secondDatasetValues') as FormControl;
  }

  headers = { 'content-type': 'application/json'};
  PATH_OF_API = "http://localhost:9001";

  constructor(private router: Router,private fb: FormBuilder,private userAuthService:UserAuthService, private httpclient: HttpClient, public dialog: MatDialog,public activatedRoute: ActivatedRoute) { 
    Chart.register(...registerables);
  }

  
  ngAfterViewInit(): void {
    if(this.editedChart.chartDatasets.length == 2)
    {  
          let stringBackgroundArray : string[] =  this.editedChart.chartDatasets[1].backgroundColor.toString().split(",");
          stringBackgroundArray.forEach(element => {
           this.addSecondBackgroundColorWithValue(element);
          });
    
          let stringBorderArray : string[] =  this.editedChart.chartDatasets[1].borderColor.toString().split(",");
          stringBorderArray.forEach(element => {
            this.addSecondBorderColorWithValue(element);
          });    
          
          this.editedChart.chartDatasets[1].datasetValues.forEach(element => {
            this.addSecondDatasetValueWithValue(element.toString());
          }); 
        }

        if(this.editedChart.chartType === 'scatter'){
          this.addDatasetValueWithValueScatter(this.editedChart.chartDatasets[0].datasetValues);
    }
     else if(this.editedChart.chartType === 'bubble'){
              this.addDatasetValueWithValueBubble(this.editedChart.chartDatasets[0].datasetValues);
         } 
     else
     {
       this.editedChart.chartDatasets[0].datasetValues.forEach(element => {
         this.addDatasetValueWithValue(element.toString());
       });
     }
      
     this.getChartFormChange();
        }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(()=> {
      this.editedChart = window.history.state;
    });

      if(this.editedChart && this.editedChart.chartDatasets.length ==2) {
      this.chartForm = this.fb.group({
        chartTitle: [this.editedChart.chartTitle],
        chartSubtitle: [this.editedChart.chartSubtitle],
        chartBackgroundColor: [this.editedChart.chartBackgroundColor],
        chartType: ['line'],
        chartAnimation: ['none'],
        chartLabels: this.fb.array([]),
        backgroundColor: [''],
        borderColor: [''],
        datasetLabel: [this.editedChart.chartDatasets[0].label],
        datasetValues: [''],
        datasetType: [this.editedChart.chartDatasets[0].type],
        secondBackgroundColor: [''],
        secondBorderColor: [''],
        secondDatasetLabel: [this.editedChart.chartDatasets[1].label],
        secondDatasetValues: [''],
        secondDatasetType: [this.editedChart.chartDatasets[1].type],
      });}
    else {
      this.chartForm = this.fb.group({
        chartTitle: [this.editedChart.chartTitle],
        chartSubtitle: [this.editedChart.chartSubtitle],
        chartBackgroundColor: [this.editedChart.chartBackgroundColor],
        chartType: [this.editedChart.chartType],
        chartAnimation: [this.editedChart.chartAnimation],
        chartLabels: this.fb.array([]),
        backgroundColor: [''],
        borderColor: [''],
        datasetLabel: [this.editedChart.chartDatasets[0].label],
        datasetValues: ['']
      });}      
    
      if(this.editedChart.chartLabels){
        this.editedChart.chartLabels.forEach( element =>
          this.labels.push(this.fb.group({label: [element]})));
        }

      let stringBackgroundArray : string[] =  this.editedChart.chartDatasets[0].backgroundColor.toString().split(",");
      stringBackgroundArray.forEach(element => {
        this.addBackgroundColorWithValue(element);
      });

      let stringBorderArray : string[] =  this.editedChart.chartDatasets[0].borderColor.toString().split(",");
      stringBorderArray.forEach(element => {
        this.addBorderColorWithValue(element);
      });    
      
  }

  editChart() {

    
    let chartLabelArray : String[] = [];

    interface Label {
     label: string;
    }

    interface TransformedChartDataset {
      label: string;
      type?: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    let chartDatasetArray : TransformedChartDataset[] = [];
    
      let stringBackgroundArray : string [] = this.chartForm.getRawValue()["backgroundColor"].split(";");
      stringBackgroundArray.pop();

      let stringBorderArray : string [] = this.chartForm.getRawValue()["borderColor"].split(";");
      stringBorderArray.pop();
      
      let firstType : string;
      let secondType : string;

      if(this.editedChart.chartDatasets.length == 2){
        
      firstType = this.chartForm.getRawValue()["datasetType"];
      secondType = this.chartForm.getRawValue()["secondDatasetType"];

      let stringSecondBackgroundArray : string [] = this.chartForm.getRawValue()["secondBackgroundColor"].split(";");
      stringSecondBackgroundArray.pop();

      let stringSecondBorderArray : string [] = this.chartForm.getRawValue()["secondBorderColor"].split(";");
      stringSecondBorderArray.pop();

        chartDatasetArray.push(
          {
            label:this.chartForm.getRawValue()["datasetLabel"],
            backgroundColor:stringBackgroundArray,
            type:firstType,
            borderColor:stringBorderArray,
            datasetValues: this.chartForm.getRawValue()["datasetValues"].split(";"),
          }
        );
      
            
      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["secondDatasetLabel"],
          backgroundColor:stringSecondBackgroundArray,
          borderColor:stringSecondBorderArray,
          type:secondType,
          datasetValues: this.chartForm.getRawValue()["secondDatasetValues"].split(";"),
        }
      );
      }
      else {

    let datasetValues = this.chartForm.getRawValue()["datasetValues"].split(";");

      
    datasetValues = datasetValues.filter((obj: string) => {return obj !== ''});
   
    chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["datasetLabel"],
          backgroundColor:stringBackgroundArray,
          borderColor:stringBorderArray,
          datasetValues: datasetValues,
        }
      );      
      }

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {id: this.editedChart.id,chartTitle:this.chartForm.getRawValue()["chartTitle"],chartSubtitle:this.chartForm.getRawValue()["chartSubtitle"],chartBackgroundColor:this.chartForm.getRawValue()["chartBackgroundColor"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
   this.httpclient.put(this.PATH_OF_API + "/charts/edit",chart,{'headers':this.headers}).subscribe((res) => {

    this.dialog.open(ChatEditedSuccessComponent);
    this.router.navigate(['custom']);

 });

  }

  addLabel() {
    this.labels.push(this.fb.group({label: ['']}));
  }

  addBackgroundColorWithValue(value:string) {
    let backgroundColorExtender = document.getElementById("backgroundColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="backgroundColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value=value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateBackgroundColor();
  }

  addBackgroundColor() {
    let backgroundColorExtender = document.getElementById("backgroundColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="backgroundColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
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

  addBorderColorWithValue(value:string) {
    let backgroundColorExtender = document.getElementById("borderColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="borderColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value= value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateBorderColor();
  }

  addBorderColor() {
    let backgroundColorExtender = document.getElementById("borderColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="borderColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
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

  addDatasetValueWithValue(value: string) {
    let datasetValueExtender = document.getElementById("datasetValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value=value;
    datasetValueExtender?.appendChild(input);   
    
    this.calculateDatasetValue();
  }

  addDatasetValueWithValueScatter(values: number[]) {
      let datasetValueExtender = document.getElementById("datasetValueExtender");
      for(let i =0; i<values.length;i+=2)
 {
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    if(values[i] || values[i] === 0)
    input.value=values[i].toString();
    var input1 = document.createElement("input");
    input1.type="number";
    input1.name="datasetValuePicker";
    input1.style.cssText = " width: 50px; margin: 5px;";
    if(values[i+1] || values[i+1] === 0)
    input1.value=values[i+1].toString();
   

    div.innerText='x:';
    div1.innerText='y:';
    div.appendChild(input);
    div1.appendChild(input1);
   

    datasetValueExtender?.appendChild(div);
    datasetValueExtender?.appendChild(div1);
      
    this.calculateDatasetValue();
 }
  }

  addDatasetValueWithValueBubble(values: number[]) {
    let datasetValueExtender = document.getElementById("datasetValueExtender");

    for(let i =0; i<values.length;i+=3)
 {
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    if(values[i] || values[i] === 0)
    input.value=values[i].toString();
    var input1 = document.createElement("input");
    input1.type="number";
    input1.name="datasetValuePicker";
    input1.style.cssText = " width: 50px; margin: 5px;";
    if(values[i+1] || values[i+1] === 0)
    input1.value=values[i+1].toString();
    var input2 = document.createElement("input");
    input2.type="number";
    input2.name="datasetValuePicker";
    input2.style.cssText = " width: 50px; margin: 5px;";
    if(values[i+2] || values[i+2] === 0 )
    input2.value=values[i+2].toString();

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
  }

  calculateDatasetValue() {
    let datasetValueList = document.getElementsByName("datasetValuePicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetValues.setValue("");

    for(let i=0; i<datasetValueList.length; i++){
    this.datasetValues.setValue(this.datasetValues.getRawValue()+datasetValueList[i].value+";");
    }
  }

  addSecondBackgroundColor() {
    let backgroundColorExtender = document.getElementById("backgroundSecondColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="backgroundSecondColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondBackgroundColor();
  }

  addSecondBackgroundColorWithValue(value: string) {
    let backgroundColorExtender = document.getElementById("backgroundSecondColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="backgroundSecondColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value= value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondBackgroundColor();
  }

  calculateSecondBackgroundColor() {
    let colorPickerList = document.getElementsByName("backgroundSecondColorPicker") as NodeListOf<HTMLInputElement>;
    
    this.datasetSecondBackground.setValue("");

    for(let i=0; i<colorPickerList.length; i++){
    this.datasetSecondBackground.setValue(this.datasetSecondBackground.getRawValue()+colorPickerList[i].value+";");
    }
  }

  addSecondBorderColor() {
    let backgroundColorExtender = document.getElementById("borderSecondColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="borderSecondColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondBorderColor();
  }

  addSecondBorderColorWithValue(value: string) {
    let backgroundColorExtender = document.getElementById("borderSecondColorExtender");
    var input = document.createElement("input");
    input.type="color";
    input.name="borderSecondColorPicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value = value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondBorderColor();
  }

  calculateSecondBorderColor() {
    let colorPickerList = document.getElementsByName("borderSecondColorPicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetSecondBorder.setValue("");

    for(let i=0; i<colorPickerList.length; i++){
    this.datasetSecondBorder.setValue(this.datasetSecondBorder.getRawValue()+colorPickerList[i].value+";");
    }
  }

  addSecondDatasetValue() {
    let backgroundColorExtender = document.getElementById("datasetSecondValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetSecondValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondDatasetValue();
  }

  addSecondDatasetValueWithValue(value: string) {
    let backgroundColorExtender = document.getElementById("datasetSecondValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetSecondValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value= value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateSecondDatasetValue();
  }

  calculateSecondDatasetValue() {
    let datasetValueList = document.getElementsByName("datasetSecondValuePicker") as NodeListOf<HTMLInputElement>;
       
    this.datasetSecondValues.setValue("");

    for(let i=0; i<datasetValueList.length; i++){
    this.datasetSecondValues.setValue(this.datasetSecondValues.getRawValue()+datasetValueList[i].value+";");
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
      type?: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    if(this.editedChart.chartDatasets.length == 2){
      let chartDatasetArray : TransformedChartDataset[] = [];
    
         
    let backgroundColor = this.chartForm.getRawValue()["secondBackgroundColor"].split(";");

    backgroundColor.pop();

    let borderColor = this.chartForm.getRawValue()["secondBorderColor"].split(";");
   
    borderColor.pop();

    let datasetValues = this.chartForm.getRawValue()["secondDatasetValues"].split(";");
      
    datasetValues = datasetValues.filter((obj: string) => {return obj !== ''});

      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["secondDatasetLabel"],
          type:this.chartForm.getRawValue()["secondDatasetType"],
          backgroundColor:backgroundColor,
          borderColor:borderColor,
          datasetValues: datasetValues,
        }        
      );

      backgroundColor = this.chartForm.getRawValue()["backgroundColor"].split(";");

      backgroundColor.pop();
 
      borderColor = this.chartForm.getRawValue()["borderColor"].split(";");
 
      borderColor.pop();
   
    datasetValues = this.chartForm.getRawValue()["datasetValues"].split(";");
      
    datasetValues = datasetValues.filter((obj: string) => {return obj !== ''});

      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["datasetLabel"],
          type:this.chartForm.getRawValue()["datasetType"],
          backgroundColor:backgroundColor,
          borderColor:borderColor,
          datasetValues: datasetValues,
        }        
      );
        

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"],chartSubtitle:this.chartForm.getRawValue()["chartSubtitle"],chartBackgroundColor:this.chartForm.getRawValue()["chartBackgroundColor"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
    
   
    this.createChart(chart);

    }
    else {

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
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"], chartSubtitle:this.chartForm.getRawValue()["chartSubtitle"],chartBackgroundColor:this.chartForm.getRawValue()["chartBackgroundColor"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};

    this.createChart(chart);
  }}


  createChart(chart : any): void {
    if (chart) {

 let horizontalFlag = false;
     
let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];
   

if(chart.chartType === 'radar')
{
  chart.chartDatasets.forEach((element: { backgroundColor: any; type: any; label: any; borderColor: any; datasetValues: any; }) => {
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
else if(chart.chartType === 'bubble')
{
  chart.chartDatasets.forEach((element: { datasetValues: string | any[]; type: any; label: any; backgroundColor: any; borderColor: any; }) => {

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
else if(chart.chartType === 'scatter')
{
  chart.chartDatasets.forEach((element: { datasetValues: string | any[]; type: any; label: any; backgroundColor: any; borderColor: any; }) => {

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
  let datasetsNumber = chart.chartDatasets.length;
 
chart.chartDatasets.forEach((element: { type: any; label: any; backgroundColor: any; borderColor: any; datasetValues: any; }) => {
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
labels: chart.chartLabels,
datasets: chartDatasets,
};

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (sChart: { width?: any; height?: any; ctx?: any; }, args: any, options: { color: string; }) => {
    const {ctx} = sChart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = chart.chartBackgroundColor || 'rgb(255,255,255)';
    ctx.fillRect(0, 0, sChart.width, sChart.height);
    ctx.restore();
  }
};

if(chart.chartType === 'bar-horizontal')
{
  chart.chartAnimation = 'none';
}

let config: ChartConfiguration;
    
    if(chart.chartAnimation === 'none' || chart.chartAnimation === '' || chart.chartAnimation === null || chart.chartAnimation === undefined )
    {
      if(chart.chartType === 'bar-horizontal')
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
                  text:chart.chartTitle
              },
              subtitle: {
                display: true,
                  text:chart.chartSubtitle
              }            
            }
           },
           plugins: [plugin],
        };
    }
    else{
      config = {
          type: chart.chartType,
          data: data,
          options: {
            aspectRatio: 2,
            plugins: {
              title: {
                  display: true,
                  text:chart.chartTitle
              },
              subtitle: {
                display: true,
                  text:chart.chartSubtitle
              }            
            }
           },
           plugins: [plugin],
        };
      }
    }
    else {

      let chartAnimation : any = chart.animation;

      config = {
        type: chart.chartType,
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
              text:chart.chartTitle
          },
          subtitle: {
            display: true,
              text:chart.chartSubtitle
          }            
        }},
        plugins: [plugin]
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
                text:chart.chartTitle
            },
            subtitle: {
              display: true,
                text:chart.chartSubtitle
            }            
          }
         },
        }}
        
    
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

    calculateFirstDataset() {      

    let datasetValueExtender = document.getElementById("datasetValueExtender");
    datasetValueExtender!.innerHTML='';

    if(this.chartType.getRawValue() === 'scatter'){
        this.addDatasetValueWithValueScatter(this.editedChart.chartDatasets[0].datasetValues);
  }
   else if(this.chartType.getRawValue() === 'bubble'){
            this.addDatasetValueWithValueBubble(this.editedChart.chartDatasets[0].datasetValues);
       } 
   else
   {
    this.editedChart.chartDatasets[0].datasetValues.forEach((element: { toString: () => string; }) => {
       this.addDatasetValueWithValue(element.toString());
     });
   }
   
    }
      
}
