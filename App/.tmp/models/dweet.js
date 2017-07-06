export var Dweet = (function () {
    function Dweet($this_, $by_, $the_, $with_) {
        this.this_ = $this_;
        this.by_ = $by_;
        this.the_ = $the_;
        this.with_ = $with_;
    }
    Object.defineProperty(Dweet.prototype, "$this_", {
        get: function () {
            return this.this_;
        },
        set: function (value) {
            this.this_ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dweet.prototype, "$by_", {
        get: function () {
            return this.by_;
        },
        set: function (value) {
            this.by_ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dweet.prototype, "$the_", {
        get: function () {
            return this.the_;
        },
        set: function (value) {
            this.the_ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dweet.prototype, "$with_", {
        get: function () {
            return this.with_;
        },
        set: function (value) {
            this.with_ = value;
        },
        enumerable: true,
        configurable: true
    });
    return Dweet;
}());
//# sourceMappingURL=dweet.js.map