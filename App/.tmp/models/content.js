export var Content = (function () {
    function Content(consumo) {
        this.consumo = '0';
        this.consumo = consumo;
    }
    Object.defineProperty(Content.prototype, "$consumo", {
        get: function () {
            return this.consumo;
        },
        set: function (value) {
            this.consumo = value;
        },
        enumerable: true,
        configurable: true
    });
    return Content;
}());
//# sourceMappingURL=content.js.map