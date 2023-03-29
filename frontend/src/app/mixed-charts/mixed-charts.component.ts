import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChartType, ChartConfiguration, ChartItem, Chart, registerables } from 'chart.js';
import { ChartCreatedSuccessComponent } from '../chart-created-success/chart-created-success.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-mixed-charts',
  templateUrl: './mixed-charts.component.html',
  styleUrls: ['./mixed-charts.component.scss']
})
export class MixedChartsComponent implements OnInit {

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



  ngOnInit(): void {
    this.chartForm = this.fb.group({
      chartTitle: [''],
      chartType: ['line'],
      chartAnimation: ['none'],
      chartLabels: this.fb.array([this.fb.group({label: ['']}), this.fb.group({label: ['']})]),
      backgroundColor: [''],
      borderColor: [''],
      datasetLabel: [''],
      datasetValues: [''],
      datasetType: [''],
      secondBackgroundColor: [''],
      secondBorderColor: [''],
      secondDatasetLabel: [''],
      secondDatasetValues: [''],
      secondDatasetType: [''],
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
      type: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    let chartDatasetArray : TransformedChartDataset[] = [];
    
     
    let backgroundColor = this.chartForm.getRawValue()["secondBackgroundColor"].split(";");

    backgroundColor.pop();

    let borderColor = this.chartForm.getRawValue()["secondBorderColor"].split(";");

    borderColor.pop();

      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["secondDatasetLabel"],
          type:this.chartForm.getRawValue()["secondDatasetType"],
          backgroundColor:backgroundColor,
          borderColor:borderColor,
          datasetValues: this.chartForm.getRawValue()["secondDatasetValues"].split(";"),
        }        
      );

      backgroundColor = this.chartForm.getRawValue()["backgroundColor"].split(";");

      backgroundColor.pop();
 
      borderColor = this.chartForm.getRawValue()["borderColor"].split(";");
 
      borderColor.pop();

      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["datasetLabel"],
          type:this.chartForm.getRawValue()["datasetType"],
          backgroundColor:backgroundColor,
          borderColor:borderColor,
          datasetValues: this.chartForm.getRawValue()["datasetValues"].split(";"),
        }        
      );
        

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"], chartType:this.chartForm.getRawValue()["chartType"], chartAnimation:this.chartForm.getRawValue()["chartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
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
      type: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

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
