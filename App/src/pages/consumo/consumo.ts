import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Dweet} from '../../models/dweet';
import {DweetService} from '../../providers/dweet-service';
import {DweetSettingsEnum} from '../../enum/dweetSettingsEnum';

@Component({
  selector: 'page-consumo',
  templateUrl: 'consumo.html'
})
export class ConsumoPage {

  private thingName: any;
  private dweet : Dweet;
  private isLoading : boolean = true;
  private time : any;
  private dataPlot : Array<any>;

  chart : Object;
  options : Object;
  saveInstance(chartInstance){
    this.chart = chartInstance;
  }

  constructor(public navCtrl: NavController, private dweetService : DweetService) {
    this.time = setInterval(() => {this.getLastDweets()},3000);
  }

  ionViewDidLoad() {
    console.log('Hello ConsumoPage Page');
  }

  ngOnInit(){
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.getLastDweets;
  }

  ngOnDestroy(){
    clearInterval(this.time);
  }

  private getLastDweets(){
    this.dataPlot = [];
    this.dweetService.loadLastDweets(this.thingName).subscribe(
      data => this.preencherDweet(data),
      err => console.log(),
      () => this.isLoading = false
    );
  }

  private preencherDweet(data : any){
    this.dweet = this.dweetService.preencherDweet(data);
    this.loadDataForPlot(this.dweet);
    this.plotChart();
  }

  private loadDataForPlot(dweet : Dweet){
    for(let with_ of dweet.$with_){
      let epoch = new Date(with_.$time);
      this.dataPlot.push([epoch, with_.$content.$consumo])
    }
  }

  private plotChart(){
    this.options ={
      xAxis: {
        type: 'dateTime' + "second"
      },
      yAxis : {
        labels:{
          formatter: function(){
            return this.value + 'W';            
          }
        },
      },
      title : { text : 'Consumo'},
      series: [{
        name: 'Consumo em watts',
        data : this.dataPlot.reverse(),
        pointInterval : 1
      }]
    };
  }
}