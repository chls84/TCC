import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ChartModule } from 'angular2-highcharts';
import { ConsumoPage } from '../pages/consumo/consumo';
import { DweetService } from '../providers/dweet-service';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
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
                    providers: [DweetService]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map