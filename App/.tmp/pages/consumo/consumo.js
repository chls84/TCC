import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DweetService } from '../../providers/dweet-service';
import { DweetSettingsEnum } from '../../enum/dweetSettingsEnum';
export var ConsumoPage = (function () {
    function ConsumoPage(navCtrl, dweetService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dweetService = dweetService;
        this.isLoading = true;
        this.time = setInterval(function () { _this.getLastDweets(); }, 3000);
    }
    ConsumoPage.prototype.saveInstance = function (chartInstance) {
        this.chart = chartInstance;
    };
    ConsumoPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ConsumoPage Page');
    };
    ConsumoPage.prototype.ngOnInit = function () {
        this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
        this.getLastDweets;
    };
    ConsumoPage.prototype.ngOnDestroy = function () {
        clearInterval(this.time);
    };
    ConsumoPage.prototype.getLastDweets = function () {
        var _this = this;
        this.dataPlot = [];
        this.dweetService.loadLastDweets(this.thingName).subscribe(function (data) { return _this.preencherDweet(data); }, function (err) { return console.log(); }, function () { return _this.isLoading = false; });
    };
    ConsumoPage.prototype.preencherDweet = function (data) {
        this.dweet = this.dweetService.preencherDweet(data);
        this.loadDataForPlot(this.dweet);
        this.plotChart();
    };
    ConsumoPage.prototype.loadDataForPlot = function (dweet) {
        for (var _i = 0, _a = dweet.$with_; _i < _a.length; _i++) {
            var with_ = _a[_i];
            var epoch = new Date(with_.$time);
            this.dataPlot.push([epoch, with_.$content.$consumo]);
        }
    };
    ConsumoPage.prototype.plotChart = function () {
        this.options = {
            xAxis: {
                type: 'dateTime'
            },
            yAxis: {
                labels: {
                    formatter: function () {
                        return this.value + 'W';
                    }
                },
            },
            title: { text: 'Consumo' },
            series: [{
                    name: 'Consumo em watts',
                    data: this.dataPlot.reverse(),
                    pointInterval: 1
                }]
        };
    };
    ConsumoPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-consumo',
                    templateUrl: 'consumo.html'
                },] },
    ];
    /** @nocollapse */
    ConsumoPage.ctorParameters = [
        { type: NavController, },
        { type: DweetService, },
    ];
    return ConsumoPage;
}());
//# sourceMappingURL=consumo.js.map