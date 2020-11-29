"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotor = void 0;
var utils_1 = require("../utils");
var Rotor = /** @class */ (function () {
    function Rotor(p) {
        var _this = this;
        this.getWiresByRotorId = function (rotorId) {
            switch (rotorId) {
                case 'I':
                    return 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
                case 'II':
                    return 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
                case 'III':
                    return 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
                case 'IV':
                    return 'ESOVPZJAYQUIRHXLNFTGKDCMWB';
                case 'V':
                    return 'VZBRGITYUPSDNHLXAWMJQOFECK';
            }
        };
        this.getTurnoverNotchPositions = function () {
            switch (_this.type) {
                case 'I':
                    return 'R'.charCodeAt(0);
                case 'II':
                    return 'F'.charCodeAt(0);
                case 'III':
                    return 'W'.charCodeAt(0);
                case 'IV':
                    return 'K'.charCodeAt(0);
                case 'V':
                    return 'A'.charCodeAt(0);
            }
        };
        var type = p.type, _a = p.position, position = _a === void 0 ? 'A' : _a, _b = p.ringSetting, ringSetting = _b === void 0 ? 1 : _b;
        this.turnoverCountdown = 0;
        this.wires = {};
        this.inverseWires = {};
        this.position = position;
        this.ringSetting = ringSetting;
        this.type = type;
        this.innerRingPosition = 0;
        this.setupWires();
        this.setTurnoverLetter();
        this.setInnerPosition(ringSetting);
        this.setInitialPosition(position.toUpperCase());
    }
    Rotor.prototype.encrypt = function (letter, inverseStep) {
        if (inverseStep === void 0) { inverseStep = false; }
        var letterCode = letter.charCodeAt(0) - utils_1.STARTING_CODE_OF_LATIN_LETTERS;
        if (inverseStep) {
            var offsetLetterCode = (letterCode + this.innerRingPosition) % utils_1.ALPHABET_LETTERS_COUNT;
            if (offsetLetterCode < 0) {
                offsetLetterCode += utils_1.ALPHABET_LETTERS_COUNT;
            }
            return this.inverseWires[String.fromCharCode(utils_1.STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode)];
        }
        else {
            var outputLetterCode = this.wires[letter].charCodeAt(0) - utils_1.STARTING_CODE_OF_LATIN_LETTERS;
            var offsetLetterCode = (outputLetterCode - this.innerRingPosition) % utils_1.ALPHABET_LETTERS_COUNT;
            if (offsetLetterCode < 0) {
                offsetLetterCode += utils_1.ALPHABET_LETTERS_COUNT;
            }
            return String.fromCharCode(utils_1.STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode);
        }
    };
    Rotor.prototype.step = function () {
        this.stepWires();
        this.turnover();
        this.innerRingPosition += 1;
    };
    Rotor.prototype.setupWires = function () {
        var wiringTable = this.getWiresByRotorId(this.type);
        var wiringTableArray = wiringTable.split('');
        var alphabetArray = utils_1.ALPHABET.split('');
        for (var i = 0; i < utils_1.ALPHABET_LETTERS_COUNT; i++) {
            this.wires[alphabetArray[i]] = wiringTableArray[i];
            this.inverseWires[wiringTableArray[i]] = alphabetArray[i];
        }
    };
    Rotor.prototype.setInitialPosition = function (initialPosition) {
        var letterCode = initialPosition.charCodeAt(0) - utils_1.STARTING_CODE_OF_LATIN_LETTERS;
        for (var i = 0; i < letterCode; i++) {
            this.step();
        }
    };
    Rotor.prototype.setInnerPosition = function (innerRingPosition) {
        // Позиции в машине устанавливаются с 1 до 26.
        var numberOfSteps = innerRingPosition - 1;
        if (!numberOfSteps) {
            return;
        }
        for (var i = 0; i < utils_1.ALPHABET_LETTERS_COUNT - numberOfSteps; i++) {
            this.stepWires();
            this.innerRingPosition += 1;
        }
    };
    Rotor.prototype.turnover = function () {
        this.turnoverCountdown -= 1;
        if (this.turnoverCountdown === 0) {
            // Как только мы нашли нужную букву, через которую сделали переход.
            // Мы должны обновить значение countdown'а (потому что до этой буквы нужно пройти весь алфавит)
            this.turnoverCountdown = utils_1.ALPHABET_LETTERS_COUNT;
        }
    };
    ;
    Rotor.prototype.stepWires = function () {
        var newWires = {};
        for (var i = 0; i < utils_1.ALPHABET_LETTERS_COUNT; i++) {
            var currentLetter = utils_1.ALPHABET[i];
            var nextLetter = utils_1.ALPHABET[(i + 1) % utils_1.ALPHABET_LETTERS_COUNT];
            newWires[currentLetter] = this.wires[nextLetter];
            this.inverseWires[this.wires[currentLetter]] = currentLetter;
        }
        this.wires = newWires;
        for (var i = 0; i < utils_1.ALPHABET_LETTERS_COUNT; i++) {
            var letter = utils_1.ALPHABET[i];
            var encodedLetter = this.wires[letter];
            this.inverseWires[encodedLetter] = letter;
        }
        // Меняем позицию внутри ротора. Т.к. шаг = 1, мы всегда просто смещаем на 1 шаг.
        this.position = String.fromCharCode(utils_1.STARTING_CODE_OF_LATIN_LETTERS + ((this.position.charCodeAt(0) + 1 - utils_1.STARTING_CODE_OF_LATIN_LETTERS) % utils_1.ALPHABET_LETTERS_COUNT));
    };
    Rotor.prototype.setTurnoverLetter = function () {
        this.turnoverCountdown = this.getTurnoverNotchPositions();
    };
    ;
    return Rotor;
}());
exports.Rotor = Rotor;
