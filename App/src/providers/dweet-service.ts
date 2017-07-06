import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Dweet} from '../models/dweet';
import {With} from '../models/with';
import {Content} from '../models/content';
import {DweetSettingsEnum} from '../enum/dweetSettingsEnum'

@Injectable()
export class DweetService {

  private dweetioApiUrl = DweetSettingsEnum.DWEET_URL_GET_ALL;

  constructor(public http: Http) {
    console.log('Hello DweetService Provider');
  }
  
  loadLastDweets(thingName : string){
    return this.http.get(this.dweetioApiUrl + thingName).map(res => res.json());
  }

  preencherDweet(data : any){
    let dweet : Dweet;
    let withs_ : Array<With>;
    let date_ : string;
    let time_ : string;

    withs_ = new Array<With>();

    for(let with_ of data.with){
      
      let consumoContent : Content;
      consumoContent = new Content(with_.content.consumo);

      date_ = this.formatDate(with_.created);
      time_ = this.formatTime(with_.created);

      let consumoWith : With;
      consumoWith = new With(with_.thing, with_.created, consumoContent, date_, time_);
      withs_.push(consumoWith);
    }
    dweet = new Dweet(data.this,data.by, data.the, withs_);
    return dweet;
  }

  private formatDate(date : any) : string{
    let originalDate : string = date;
    var dateParse = originalDate.slice(0,10);
    return dateParse;
  }

  private formatTime(date:any) : string{
    let originalDate : string = date;
    var timeParse = originalDate.slice(11,19);
    return timeParse;
  }
}