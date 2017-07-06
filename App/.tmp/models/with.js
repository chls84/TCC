export var With = (function () {
    function With($thing, $created, $content, $date, $time) {
        this.thing = $thing;
        this.created = $created;
        this.content = $content;
        this.date = $date;
        this.time = $time;
    }
    Object.defineProperty(With.prototype, "$thing", {
        get: function () {
            return this.thing;
        },
        set: function (value) {
            this.thing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(With.prototype, "$content", {
        get: function () {
            return this.content;
        },
        set: function (value) {
            this.content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(With.prototype, "$time", {
        get: function () {
            return this.time;
        },
        set: function (value) {
            this.time = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(With.prototype, "$created", {
        get: function () {
            return this.created;
        },
        set: function (value) {
            this.created = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(With.prototype, "$date", {
        get: function () {
            return this.date;
        },
        set: function (value) {
            this.date = value;
        },
        enumerable: true,
        configurable: true
    });
    return With;
}());
//# sourceMappingURL=with.js.map