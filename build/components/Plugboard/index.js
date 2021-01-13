"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugboard = void 0;
var Plugboard = /** @class */ (function () {
    function Plugboard(plugboardPairs) {
        this.plugboardPairs = plugboardPairs;
        this.plugs = {};
        this.addPlugs(plugboardPairs);
    }
    Plugboard.prototype.encode = function (letter) {
        if (letter in this.plugs)
            return this.plugs[letter];
        return letter;
    };
    Plugboard.prototype.addPlugs = function (plugboardPairs) {
        var pairs = plugboardPairs.split(" ");
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            this.addPlug(pair.charAt(0), pair.charAt(1));
        }
    };
    Plugboard.prototype.addPlug = function (letter1, letter2) {
        this.plugs[letter1] = letter2;
        this.plugs[letter2] = letter1;
    };
    return Plugboard;
}());
exports.Plugboard = Plugboard;
