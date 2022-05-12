import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

// Importo el archivo JSON
import archivo from "../../../assets/recovery.json";

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  // Exporto los datos del archivo JSON a la  vista
  recovery: any = archivo;
  public getLabels():string[]{
    let label:string[]=[];
    for(let variable of this.recovery){
      label.push(variable.anio);
    }
    return label.slice();
  }
  public getDataA():number[]{
    let data:number[]=[];
    for(let variable of this.recovery){
     data.push(variable.seriesA);
    }
    return data.slice();
  }
  public getDataB():number[]{
    let data:number[]=[];
    for(let variable of this.recovery){
      data.push(variable.seriesB);
    }
    return data.slice();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.getLabels(),
    datasets: [
      { data: this.getDataA(), label: 'Series A' },
      { data: this.getDataB(), label: 'Series B' },
    ]
  };

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[1].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
      Math.round(Math.random() * 100),
      20,
      Math.round(Math.random() * 100),
      80 ];

    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }




}
