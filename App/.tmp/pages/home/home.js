import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConsumoPage } from '../consumo/consumo';
export var Home = (function () {
    function Home(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
    }
    Home.prototype.goToConsumoPage = function () {
        this.navCtrl.push(ConsumoPage);
    };
    Home.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    Home.ctorParameters = [
        { type: NavController, },
        { type: Http, },
    ];
    return Home;
}());
//# sourceMappingURL=home.js.map