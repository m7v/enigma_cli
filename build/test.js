"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Machine_1 = require("./components/Machine");
var machineSetting = {
    reflectorType: "B",
    rotorSettings: [
        { type: "III", positon: "A", ringSetting: 1 },
        { type: "II", position: "A", ringSetting: 1 },
        { type: "I", position: "A", ringSetting: 1 },
    ],
    debug: true,
};
var enigma = new Machine_1.Machine(machineSetting);
var encrypted1 = enigma.encryptMessage("AAAAA");
console.log("encrypted", encrypted1);
