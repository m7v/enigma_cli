"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
var Reflector_1 = require("../Reflector");
var Plugboard_1 = require("../Plugboard");
var Rotor_1 = require("../Rotor");
var Machine = /** @class */ (function () {
    function Machine(p) {
        var reflectorType = p.reflectorType, rotorSettings = p.rotorSettings, plugboardPairs = p.plugboardPairs, _a = p.debug, debug = _a === void 0 ? false : _a;
        this.debug = debug;
        if (plugboardPairs) {
            this.plugboard = new Plugboard_1.Plugboard({ plugboardPairs: plugboardPairs });
        }
        this.rotors = [
            new Rotor_1.Rotor(rotorSettings[0]),
            new Rotor_1.Rotor(rotorSettings[1]),
            new Rotor_1.Rotor(rotorSettings[2]),
        ];
        this.reflector = new Reflector_1.Reflector({ type: reflectorType });
        this.log('========= Plugboard ==========');
        this.log("Plugs | " + plugboardPairs);
        this.log('========= 1st Rotor ==========');
        this.log("Type | " + this.rotors[0].type);
        this.log("Ring setting | " + this.rotors[0].ringSetting);
        this.log("Start position | " + this.rotors[0].position);
        this.log('========= 2nd Rotor ==========');
        this.log("Type | " + this.rotors[1].type);
        this.log("Ring setting | " + this.rotors[1].ringSetting);
        this.log("Start position | " + this.rotors[1].position);
        this.log('========= 3rd Rotor ==========');
        this.log("Type | " + this.rotors[2].type);
        this.log("Ring setting | " + this.rotors[2].ringSetting);
        this.log("Start position | " + this.rotors[2].position);
        this.log('========= Reflector ==========');
        this.log("Type | " + reflectorType);
    }
    Machine.prototype.encryptMessage = function (text) {
        var _this = this;
        var encryptedText = text
            .split('')
            .filter(function (l) { return l !== ' '; })
            .map(function (letter) { return _this.encryptLetter(letter); })
            .join('');
        var temp1 = encryptedText.match(/.{0,5}/g) || [];
        var temp2 = temp1.map(function (l) { return l.trim(); }).join(' ').match(/.{0,23}/g) || [];
        return temp2.map(function (l) { return l.trim(); }).join('\n');
    };
    Machine.prototype.encryptLetter = function (inpLetter) {
        var matchLetter = inpLetter
            .toUpperCase()
            .match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/);
        if (!matchLetter) {
            return inpLetter;
        }
        var letter = matchLetter[0];
        // Double stepping anomaly
        // Rotors turns over the rotor on their right as well. This is not noticed
        // in rotor 0 because it always steps anyway.
        if (this.rotors[1].turnoverCountdown == 1 &&
            this.rotors[2].turnoverCountdown == 1) {
            this.rotors[1].step();
        }
        // Update rotor position after encoding
        this.rotors[0].step();
        this.log('Machine encoding');
        this.log('letter: ' + letter);
        this.log("Rotors Position: " + this.rotors[2].position + this.rotors[1].position + this.rotors[0].position);
        var plugboardDirect = undefined;
        if (this.plugboard) {
            plugboardDirect = this.plugboard.encode(letter);
            this.log('plugboardDirect: ' + letter + ' -> ' + plugboardDirect);
        }
        var rotorsDirect = plugboardDirect
            ? this.encodeWithRotors(plugboardDirect)
            : this.encodeWithRotors(letter);
        var reflectorInverse = this.reflector.encrypt(rotorsDirect);
        this.log("reflectorInverse " + this.reflector.type + ": " + rotorsDirect + " -> " + reflectorInverse);
        var rotorsInverse = this.encodeInverseWithRotors(reflectorInverse);
        if (this.plugboard) {
            var plugboardInverse = this.plugboard.encode(rotorsInverse);
            this.log('plugboardInverse: ' + rotorsInverse + ' -> ' + plugboardInverse);
            return plugboardInverse;
        }
        return rotorsInverse;
    };
    Machine.prototype.encodeWithRotors = function (letter) {
        var output = '';
        for (var i = 0; i < this.rotors.length; i++) {
            output = this.rotors[i].encrypt(letter);
            this.log("rotor " + this.rotors[i].type + " direct: " + letter + " -> " + output);
            letter = output;
        }
        return output;
    };
    ;
    Machine.prototype.encodeInverseWithRotors = function (letter) {
        var output = '';
        for (var i = this.rotors.length - 1; i >= 0; i--) {
            output = this.rotors[i].encrypt(letter, true);
            this.log("rotor " + this.rotors[i].type + " inverse: " + letter + " -> " + output);
            letter = output;
        }
        return output;
    };
    Machine.prototype.log = function (message) {
        if (this.debug) {
            console.log(message);
        }
    };
    return Machine;
}());
exports.Machine = Machine;
