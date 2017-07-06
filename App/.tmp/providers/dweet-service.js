import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dweet } from '../models/dweet';
import { With } from '../models/with';
import { Content } from '../models/content';
import { DweetSettingsEnum } from '../enum/dweetSettingsEnum';
export var DweetService = (function () {
    function DweetService(http) {
        this.http = http;
        this.dweetioApiUrl = DweetSettingsEnum.DWEET_URL_GET_ALL;
        console.log('Hello DweetService Provider');
    }
    DweetService.prototype.loadLastDweets = function (thingName) {
        return this.http.get(this.dweetioApiUrl + thingName).map(function (res) { return res.json(); });
    };
    DweetService.prototype.preencherDweet = function (data) {
        var dweet;
        var withs_;
        var date_;
        var time_;
        withs_ = new Array();
        for (var _i = 0, _a = data.with; _i < _a.length; _i++) {
            var with_ = _a[_i];
            var consumoContent = void 0;
            consumoContent = new Content(with_.content.consumo);
            date_ = this.formatDate(with_.created);
            time_ = this.formatTime(with_.created);
            var consumoWith = void 0;
            consumoWith = new With(with_.thing, with_.created, consumoContent, date_, time_);
            withs_.push(consumoWith);
        }
        dweet = new Dweet(data.this, data.by, data.the, withs_);
        return dweet;
    };
    DweetService.prototype.formatDate = function (date) {
        var originalDate = date;
        var dateParse = originalDate.slice(0, 10);
        return dateParse;
    };
    DweetService.prototype.formatTime = function (date) {
        var originalDate = date;
        var timeParse = originalDate.slice(11, 19);
        return timeParse;
    };
    DweetService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DweetService.ctorParameters = [
        { type: Http, },
    ];
    return DweetService;
}());
//# sourceMappingURL=dweet-service.js.map