function createSquare(config) {
}
var mySquare = createSquare({ colour: "red", width: 100 });
var mySquare2 = createSquare({ width: 100, opacity: 0.5 });
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
var Clock = (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
