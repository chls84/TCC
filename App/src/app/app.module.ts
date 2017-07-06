import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ChartModule } from 'angular2-highcharts';
import {ConsumoPage} from '../pages/consumo/consumo';
import {DweetService} from '../providers/dweet-service';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ConsumoPage  
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ConsumoPage
  ],
  providers:[DweetService]
})
export class AppModule {}