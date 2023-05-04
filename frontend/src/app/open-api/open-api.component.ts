import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, ChartItem, registerables } from 'node_modules/chart.js';
import { environment } from 'src/environments/environment';
import { ChartSavedSuccessfullyComponent } from '../chart-saved-successfully/chart-saved-successfully.component';
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-open-api',
  templateUrl: './open-api.component.html',
  styleUrls: ['./open-api.component.scss']
})
export class OpenApiComponent {
  private backgroundColor: string[]= [];
  private borderColor: string[]=[];
  private chart!: Chart;
  private datasetLabel:string = "";
  private datasetValues: number[]= [];
  private headers = { 'content-type': 'application/json'};
  private labels:string[] = [];
  private PATH_OF_API = "http://localhost:9001";
  private rgbaToHex = (color: string): string => {
    if (/^rgb/.test(color)) {
      const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
  
      let hex = `#${((1 << 24) + (parseInt(rgba[0], 10) << 16) + (parseInt(rgba[1], 10) << 8) + parseInt(rgba[2], 10))
        .toString(16)
        .slice(1)}`;
  
      if (rgba[4]) {
        const alpha = Math.round(0o1 * 255);
        const hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
        hex += hexAlpha;
      }
  
      return hex;
    }
    return color;
  };
  private type:string = "";
  constructor(private userAuthService:UserAuthService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,
    private httpclient: HttpClient,
    public dialog: MatDialog
) { }

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

 generateText(){

      if(this.chart)
      {
        this.chart.destroy();
      }

      let div =document.getElementById("chatGptResponse");
      let input =document.getElementById("myInput") as HTMLInputElement;
      div!.innerHTML="";
      div!.className = "loader";

      let downloadButton =document.getElementById("downloadButton");
      let saveButton =document.getElementById("saveButton");

      downloadButton?.classList.add("hiddenButton");
      saveButton?.classList.add("hiddenButton");

      const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(environment.openAPI)
      },
      body: JSON.stringify({
        'model' : "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "html code of a simple chart.js about "+ input!.value}],
        'temperature': 0.1,
        'max_tokens': Math.floor(2000),
        'top_p': 1,
        'frequency_penalty': 0,
        'presence_penalty': 0.5,
        'stop': ["\"\"\""],
      }),
    };
    
 
   fetch('https://api.openai.com/v1/chat/completions', requestOptions )
        .then(response => response.json())
        .then(data => {
          let chartGpt = data.choices[0].message.content.substring(data.choices[0].message.content.indexOf("ctx,") + 5, 
          data.choices[0].message.content.lastIndexOf(");"))
          div?.classList.remove("loader");
          if(chartGpt.indexOf("type") === -1)
          {  
            div!.innerText = "Sorry. Wrong input. Try again.";
          }else{
    
            Chart.register(...registerables);
            const chartItem: ChartItem = document.getElementById("myChart") as ChartItem;

            downloadButton?.classList.remove("hiddenButton");
            saveButton?.classList.remove("hiddenButton");
      
            let type =  chartGpt.substring(chartGpt.indexOf("type:"), 
            chartGpt.indexOf(","));

            let labels = chartGpt.substring(chartGpt.indexOf("labels:"), 
            chartGpt.indexOf("],")+1);

            chartGpt =  chartGpt.substring(chartGpt.indexOf("[{")+2, 
            chartGpt.indexOf("}]"));

            let datasetLabel = chartGpt.substring(chartGpt.indexOf("label"), 
            chartGpt.indexOf(","));

            let datasetValues = chartGpt.substring(chartGpt.indexOf("data"), 
            chartGpt.indexOf("backgroundColor"));

            let backgroundColor = chartGpt.substring(chartGpt.indexOf("backgroundColor"), 
            chartGpt.indexOf("borderColor"));

            let borderColor = chartGpt.substring(chartGpt.indexOf("borderColor"), 
             chartGpt.indexOf("borderWidth"));

            type = type.substring(type.indexOf("'")+1, 
            type.lastIndexOf("'"));

            labels = labels.substring(labels.indexOf("[")+1, 
            labels.indexOf("]")-1);

            datasetValues =  datasetValues.substring(datasetValues.indexOf("[")+1, 
            datasetValues.indexOf("]"));

            backgroundColor = backgroundColor.substring(backgroundColor.indexOf("'")+1, 
            backgroundColor.lastIndexOf("'"));

            backgroundColor = backgroundColor.replaceAll("\n","");
            backgroundColor = backgroundColor.replaceAll("\t","");
         
            borderColor = borderColor.substring(borderColor.indexOf("'")+1, 
            borderColor.lastIndexOf("'"));

            borderColor = borderColor.replaceAll("\n","");
            borderColor = borderColor.replaceAll("\t","");
           
            datasetLabel = datasetLabel.substring(datasetLabel.indexOf("'")+1, 
            datasetLabel.lastIndexOf("'"));

            let backgroundColorArray = backgroundColor.replaceAll(" ","").split("','");
            let borderColorArray = borderColor.replaceAll(" ","").split("','");
            let arrayDatasetValues = datasetValues.split(",");
            let labelsArray = labels.replaceAll("'", '').split(",");

            this.type = type;
            this.labels = labelsArray;
            this.datasetLabel = datasetLabel;
            this.datasetValues = datasetValues.split(',').map(Number);
            this.backgroundColor = backgroundColorArray;
            this.borderColor = borderColorArray;

         if(type === "scatter")
            {
              arrayDatasetValues = datasetValues.replaceAll(" ","").replaceAll("\n","").replaceAll("\t","").replaceAll("x",`"x"`).replaceAll("y",`"y"`);
              arrayDatasetValues = arrayDatasetValues.split(",{");
              for (let i = 1; i < arrayDatasetValues.length; i++)
               {
                arrayDatasetValues[i]="{"+arrayDatasetValues[i];
              }

                let arr = [];

                for (let i = 0; i < arrayDatasetValues.length; i++)
                {
                 arr.push(JSON.parse(arrayDatasetValues[i]));
                }

              arrayDatasetValues = arr;
              this.datasetValues = [];

              arrayDatasetValues.forEach((element: {x:number, y:number}) => {
                  this.datasetValues.push(element.x);
                  this.datasetValues.push(element.y);
              });
            }
            else if(type === "bubble"){
              arrayDatasetValues = datasetValues.replaceAll(" ","").replaceAll("\n","").replaceAll("\t","").replaceAll("x",`"x"`).replaceAll("y",`"y"`).replaceAll("r",`"r"`);
              arrayDatasetValues = arrayDatasetValues.split(",{");
              for (let i = 1; i < arrayDatasetValues.length; i++)
               {
                arrayDatasetValues[i]="{"+arrayDatasetValues[i];
              }

                let arr = [];

                for (let i = 0; i < arrayDatasetValues.length; i++)
                {
                 arr.push(JSON.parse(arrayDatasetValues[i]));
                }

              arrayDatasetValues = arr;
              this.datasetValues = [];

              arrayDatasetValues.forEach((element: {x:number, y:number, r:number}) => {
                  this.datasetValues.push(element.x);
                  this.datasetValues.push(element.y);
                  this.datasetValues.push(element.r);
              });
            }

          if(this.borderColor[0].indexOf("backgroundColor") > -1){
              this.borderColor = [];
            }

            if(this.labels[1].indexOf("data: [") > -1){
              this.labels = [];
            }

            if(labelsArray[1].indexOf("data: [") > -1) {
              labelsArray = [];
            }

            if(borderColorArray[0].indexOf("backgroundColor") > -1) {
              borderColorArray= [];
            }
                              
            let config =
            {
              type: type,
              data: {
                labels: labelsArray,
                datasets: [{
                  label: datasetLabel,
                  data: arrayDatasetValues,
                  backgroundColor: backgroundColorArray,
                  borderColor: borderColorArray,
                  borderWidth: 1
                }]
              },
              options: {aspectRatio: 2}
          }

          this.chart = new Chart(chartItem, config);

        }
        

      }).catch(err => {
                   });
                            
  }

 saveChart(){
    let borderColorHexa :string[] = [];

    this.borderColor.forEach( color =>{
      borderColorHexa.push(this.rgbaToHex(color));
    })

    let backgroundColorHexa :string[] = [];

    this.backgroundColor.forEach( color =>{
      backgroundColorHexa.push(this.rgbaToHex(color));
    })

    let chart = {chartTitle:"ChatGPTChart", chartType:this.type, chartAnimation:'none', chartLabels:this.labels,chartDatasets:[
      {
        label:this.datasetLabel,
        backgroundColor:backgroundColorHexa,
        borderColor:borderColorHexa,
        datasetValues:this.datasetValues
      }
    ],userId:this.userAuthService.getUserId()};
    this.httpclient.post(this.PATH_OF_API + "/charts/add",chart,{'headers':this.headers}).subscribe((res) => {
 
     this.dialog.open(ChartSavedSuccessfullyComponent);
    
  });
  }

public ngOnInit() {}
}


