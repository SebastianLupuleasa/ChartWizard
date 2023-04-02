import { Component, Inject, Renderer2 } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js';
import ChatGPT from "chatgpt-api"
import { Configuration, OpenAIApi } from 'openai';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ChartCreatedSuccessComponent } from '../chart-created-success/chart-created-success.component';
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-open-api',
  templateUrl: './open-api.component.html',
  styleUrls: ['./open-api.component.scss']
})
export class OpenApiComponent {

  PATH_OF_API = "http://localhost:9001";
  headers = { 'content-type': 'application/json'};

  chart!: Chart;

  type:string = "";
  labels:string[] = [];
  datasetLabel:string = "";
  datasetValues: number[]= [];
  backgroundColor: string[]= [];
  borderColor: string[]=[];

  constructor(private userAuthService:UserAuthService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,
    private httpclient: HttpClient,
    public dialog: MatDialog
) { }

public ngOnInit() {}

generateText(){

      if(this.chart)
      {
        this.chart.destroy();
      }

      let div =document.getElementById("chatGptResponse");
      let input =document.getElementById("myInput") as HTMLInputElement;
      div!.innerHTML="";
      div!.className = "loader";

      const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("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")
      },
      body: JSON.stringify({
        'model' : "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "html code of a chart.js about "+ input!.value}],
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
            // var win = window.open("", "Title", "toolbar=no,location=center,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
            // win!.document.write(chartGpt);

            Chart.register(...registerables);
            const chartItem: ChartItem = document.getElementById("myChart") as ChartItem;
      
            let goodConfig = chartGpt.substring(chartGpt.indexOf("type:"), 
            chartGpt.indexOf("},"));

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
 
     this.dialog.open(ChartCreatedSuccessComponent);
    
  });
  }

  rgbaToHex = (color: string): string => {
    if (/^rgb/.test(color)) {
      const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
  
      // rgb to hex
      // eslint-disable-next-line no-bitwise
      let hex = `#${((1 << 24) + (parseInt(rgba[0], 10) << 16) + (parseInt(rgba[1], 10) << 8) + parseInt(rgba[2], 10))
        .toString(16)
        .slice(1)}`;
  
      // added alpha param if exists
      if (rgba[4]) {
        const alpha = Math.round(0o1 * 255);
        const hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
        hex += hexAlpha;
      }
  
      return hex;
    }
    return color;
  };

}


