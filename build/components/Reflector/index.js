"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflector = void 0;
var utils_1 = require("../utils");
var Reflector = /** @class */ (function () {
    function Reflector(p) {
        this.type = p.type;
        this.reflectionTable = {};
        this.setReflectionTable();
    }
    Reflector.prototype.setReflectionTable = function () {
        var reflectionWires = this.getAlphabetByReflectorId();
        for (var i = 0; i < utils_1.ALPHABET_LETTERS_COUNT; i++) {
            this.reflectionTable[utils_1.ALPHABET[i]] = reflectionWires[i];
        }
    };
    ;
    Reflector.prototype.encrypt = function (letter) {
        return this.reflectionTable[letter];
    };
    ;
    Reflector.prototype.getAlphabetByReflectorId = function () {
        switch (this.type) {
            case 'A':
                return 'EJMZALYXVBWFCRQUONTSPIKHGD';
            case 'B':
                return 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
            case 'C':
                return 'FVPJIAOYEDRZXWGCTKUQSBNMHL';
            case 'B Thin':
                return 'ENKQAUYWJICOPBLMDXZVFTHRGS';
            case 'C Thin':
                return 'RDOBJNTKVEHMLFCWZAXGYIPSUQ';
            case 'Beta':
                return 'LEYJVCNIXWPBQMDRTAKZGFUHOS';
            case 'Gamma':
                return 'FSOKANUERHMBTIYCWLQPZXVGJD';
        }
    };
    return Reflector;
}());
exports.Reflector = Reflector;
