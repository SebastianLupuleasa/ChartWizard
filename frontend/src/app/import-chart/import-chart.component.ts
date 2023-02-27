import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ChartImportSuccessComponent } from '../chart-import-success/chart-import-success.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-import-chart',
  templateUrl: './import-chart.component.html',
  styleUrls: ['./import-chart.component.scss']
})
export class ImportChartComponent {

headers = { 'content-type': 'application/json'}  

PATH_OF_API = "http://localhost:9001";

constructor(private router: Router,private userAuthService:UserAuthService, private httpclient: HttpClient, public dialog: MatDialog) { }

import(file : FileList) {
 const selectedFile = file[0];
 const fileReader = new FileReader();

 fileReader.readAsBinaryString(selectedFile);
 fileReader.onload = ( event: any) => {
  let binaryData = event.target.result;
  let workbook = XLSX.read(binaryData, { type: 'binary'});
  workbook.SheetNames.forEach((sheet: string | number) => {
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    this.createChart(data);
  });
 } 

}

createChart(data: any) {
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
    
    if(data[0]["SecondDatasetTitle"])
{

    chartDatasetArray.push(
        {
          label:data[0]["DatasetTitle"],
          type:data[0]["DatasetType"],
          backgroundColor:data[0]["DatasetBackgroundColor"]?.split(",").filter((elm: any) => elm),
          borderColor:data[0]["DatasetBorderColor"]?.split(",").filter((elm: any) => elm),
          datasetValues: data[0]["DatasetValues"]?.split(";").filter((elm: any) => elm),
        }
      );

      
  chartDatasetArray.push(
    {
      label:data[0]["SecondDatasetTitle"],
      type:data[0]["SecondDatasetType"],
      backgroundColor:data[0]["SecondDatasetBackgroundColor"]?.split(",").filter((elm: any) => elm),
      borderColor:data[0]["SecondDatasetBorderColor"]?.split(",").filter((elm: any) => elm),
      datasetValues: data[0]["SecondDatasetValues"]?.split(";").filter((elm: any) => elm),
    }
  );
  
      }

      else{
        chartDatasetArray.push(
          {
            label:data[0]["DatasetTitle"],
            backgroundColor:data[0]["DatasetBackgroundColor"]?.split(",").filter((elm: any) => elm),
            borderColor:data[0]["DatasetBorderColor"]?.split(",").filter((elm: any) => elm),
            datasetValues: data[0]["DatasetValues"]?.split(";").filter((elm: any) => elm),
          }
        );
      }
        
        chartLabelArray = data[0]["ChartLabels"]?.split(",");
         
      console.log({chartTitle:data[0]["ChartTitle"], chartType:data[0]["ChartType"], chartAnimation:data[0]["ChartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray.reverse(),userId:this.userAuthService.getUserId()});
    
    let chart = {chartTitle:data[0]["ChartTitle"], chartType:data[0]["ChartType"], chartAnimation:data[0]["ChartAnimation"], chartLabels:chartLabelArray,chartDatasets:chartDatasetArray.reverse(),userId:this.userAuthService.getUserId()};
   this.httpclient.post(this.PATH_OF_API + "/charts/add",chart,{'headers':this.headers}).subscribe((res) => {

    this.dialog.open(ChartImportSuccessComponent);
    this.router.navigate(['custom']);
});
}
}
