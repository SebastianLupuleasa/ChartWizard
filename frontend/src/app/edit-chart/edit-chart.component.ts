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
  }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(()=> {
      this.editedChart = window.history.state;
    });

      if(this.editedChart && this.editedChart.chartDatasets.length ==2) {
      this.chartForm = this.fb.group({
        chartTitle: [this.editedChart.chartTitle],
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
      
      this.editedChart.chartDatasets[0].datasetValues.forEach(element => {
        this.addDatasetValueWithValue(element.toString());
      });

      this.getChartFormChange();
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
    
    let chart = {id: this.editedChart.id,chartTitle:this.chartForm.getRawValue()["chartTitle"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
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
    let backgroundColorExtender = document.getElementById("datasetValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateDatasetValue();
  }

  addDatasetValueWithValue(value: string) {
    let backgroundColorExtender = document.getElementById("datasetValueExtender");
    var input = document.createElement("input");
    input.type="number";
    input.name="datasetValuePicker";
    input.style.cssText = " width: 50px; margin: 5px;";
    input.value=value;
    backgroundColorExtender?.appendChild(input);   
    
    this.calculateDatasetValue();
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
    console.log(backgroundColorExtender);
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
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};

    this.createChart(chart);

  }


  createChart(chart : any): void {
    if (chart) {
     
let chartDatasets: {type: any,label: string; backgroundColor: string; borderColor: string; data: number[]; fill?:boolean, pointBackgroundColor?: string,  pointBorderColor?: string, pointHoverBackgroundColor?: string, pointHoverBorderColor?: string }[] = [];

         chart.chartDatasets.forEach((element: { type: any; label: any; backgroundColor: any; borderColor: any; datasetValues: any; }) => {
    chartDatasets.push(  {
       type: element.type,
       label: element.label,
       backgroundColor: element.backgroundColor,
       borderColor: element.borderColor,
       data: element.datasetValues,
     });
   });

      const data = {
        labels: chart.chartLabels,
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

      switch(chart.chartType){

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
    
    if(chart.chartAnimation === 'none' || chart.chartAnimation === '' || chart.chartAnimation === null || chart.chartAnimation === undefined )
    {
    config = {
        type: chartType,
        data: data,
        options: {},
      };
    }
    else {

      let chartAnimation : any = chart.animation;

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

}
