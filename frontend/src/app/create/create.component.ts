import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Dataset } from '../chart/chart.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  headers = { 'content-type': 'application/json'}  

  PATH_OF_API = "http://localhost:9001";

  backgroundColor: string ="green";

  chartForm!: FormGroup;

  constructor(private fb: FormBuilder,private userAuthService:UserAuthService, private httpclient: HttpClient) { }

get labels() {
  return this.chartForm.get('chartLabels') as FormArray;
}

get datasets() {
  return this.chartForm.get('chartDatasets') as FormArray;
}


  ngOnInit(): void {
    this.chartForm = this.fb.group({
      chartTitle: [''],
      chartType: [''],
      chartLabels: this.fb.array([this.fb.group({label: ['']}), this.fb.group({label: ['']})]
      ),
      chartDatasets: this.fb.array([this.fb.group({
        label: [''],
        backgroundColor: [''],
        borderColor: [''],
        datasetValues: [''],       
      },)]),
    });
  }

  addChart() {

    let chartLabelArray : String[] = [];

    interface Label {
     label: string;
    }

    interface ChartDataset {
      label: string;
      backgroundColor: string;
      borderColor: string;
      datasetValues: string;
    }

    interface TransformedChartDataset {
      label: string;
      backgroundColor: string[];
      borderColor: string[];
      datasetValues: string[];
    }

    let chartDatasetArray : TransformedChartDataset[] = [];

    this.chartForm.getRawValue()["chartDatasets"].forEach(function(dataset : ChartDataset){
      console.log(dataset.backgroundColor);
      chartDatasetArray.push(
        {
          label:dataset.label,
          backgroundColor:dataset.backgroundColor.split(";"),
          borderColor:dataset.borderColor.split(";"),
          datasetValues: dataset.datasetValues.split(";")
        }
      );
    })
    

    this.chartForm.getRawValue()["chartLabels"].forEach(function(label : Label){
      chartLabelArray.push(label.label);
    })
    
    let chart = {chartTitle:this.chartForm.getRawValue()["chartTitle"], chartType:this.chartForm.getRawValue()["chartType"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray,userId:this.userAuthService.getUserId()};
   this.httpclient.post(this.PATH_OF_API + "/charts/add",chart,{'headers':this.headers}).subscribe((res) => {
 });
  }

  addLabel() {
    this.labels.push(this.fb.group({label: ['']}));
  }

  addDataset()
  {
    this.datasets.push(this.fb.group({
      label: [''],
      backgroundColor: [''],
      borderColor: [''],
      datasetValues:  ['']      
    },));
  }

  setBackGroundTextValue() {
      
    let colorInput = <HTMLInputElement> document.getElementById("backgroundColorInput");
    let colorText = document.getElementById("backgroundColorText");

    colorText!.innerText= colorInput.value;
   
  }

}
