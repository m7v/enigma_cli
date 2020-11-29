"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Machine_1 = require("./components/Machine");
var machineSetting = {
    reflectorType: 'B',
    rotorSettings: [
        { type: "III", position: 'V' },
        { type: "II", position: 'E' },
        { type: "I" },
    ],
    debug: true,
};
var enigma = new Machine_1.Machine(machineSetting);
var encrypted1 = enigma.encryptMessage("A");
console.log('encrypted', encrypted1);
