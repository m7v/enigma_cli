"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Machine_1 = require("./components/Machine");
var machineSetting = {
    reflectorType: 'B',
    rotorSettings: [
        { type: "III" },
        { type: "II" },
        { type: "I" },
    ],
    debug: false,
};
var enigma1 = new Machine_1.Machine(machineSetting);
var encrypted1 = 'AAAAA'.split('').map(function (letter) { return enigma1.encrypt(letter); }).join('');
console.log('encrypted', encrypted1);
var enigma2 = new Machine_1.Machine(machineSetting);
var encrypted = ("" + encrypted1).split('').map(function (letter) { return enigma2.encrypt(letter); }).join('');
console.log('encrypted', encrypted);
