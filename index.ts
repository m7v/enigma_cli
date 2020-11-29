import { Machine } from "./components/Machine";
import {RotorSetting} from "./components/Rotor";

const machineSetting = {
    reflectorType: 'B' as const,
    rotorSettings: [
        { type: "III" } as RotorSetting,
        { type: "II" } as RotorSetting,
        { type: "I" } as RotorSetting,
    ],
    debug: false,
};

const enigma1 = new Machine(machineSetting);

const encrypted1 = 'AAAAA'.split('').map((letter) => enigma1.encrypt(letter)).join('');
console.log('encrypted', encrypted1);

const enigma2 = new Machine(machineSetting);

const encrypted = `${encrypted1}`.split('').map((letter) => enigma2.encrypt(letter)).join('');
console.log('encrypted', encrypted);
