import {Http} from '@angular/http';
import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import { ConsumoPage } from '../consumo/consumo'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController,private http:Http){
  }

  goToConsumoPage(){
    this.navCtrl.push(ConsumoPage);
  }    
}