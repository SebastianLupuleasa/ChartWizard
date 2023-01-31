import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChartCreatedSuccessComponent } from '../chart-created-success/chart-created-success.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-mixed-charts',
  templateUrl: './mixed-charts.component.html',
  styleUrls: ['./mixed-charts.component.scss']
})
export class MixedChartsComponent implements OnInit {

  headers = { 'content-type': 'application/json'}  

  PATH_OF_API = "http://localhost:9001";

  backgroundColor: string ="green";

  chartForm!: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,private userAuthService:UserAuthService, private httpclient: HttpClient, public dialog: MatDialog) { }

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
      backgroundColor: ['#000000'],
      borderColor: ['#000000'],
      datasetLabel: [''],
      datasetValues: [''],
      datasetType: [''],
      secondBackgroundColor: ['#000000'],
      secondBorderColor: ['#000000'],
      secondDatasetLabel: [''],
      secondDatasetValues: [''],
      secondDatasetType: [''],
    });
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
    
      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["secondDatasetLabel"],
          type:this.chartForm.getRawValue()["secondDatasetType"],
          backgroundColor:this.chartForm.getRawValue()["secondBackgroundColor"].split(";"),
          borderColor:this.chartForm.getRawValue()["secondBorderColor"].split(";"),
          datasetValues: this.chartForm.getRawValue()["secondDatasetValues"].split(";"),
        }        
      );

      chartDatasetArray.push(
        {
          label:this.chartForm.getRawValue()["datasetLabel"],
          type:this.chartForm.getRawValue()["datasetType"],
          backgroundColor:this.chartForm.getRawValue()["backgroundColor"].split(";"),
          borderColor:this.chartForm.getRawValue()["borderColor"].split(";"),
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

}
