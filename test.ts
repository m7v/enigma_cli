import { Machine } from './components/Machine';
import { RotorSetting } from './components/Rotor';

const machineSetting = {
    reflectorType: 'B' as const,
    rotorSettings: [
        { type: "III", position: 'V' } as RotorSetting,
        { type: "II", position: 'E' } as RotorSetting,
        { type: "I" } as RotorSetting,
    ],
    debug: true,
};

const enigma = new Machine(machineSetting);

const encrypted1 = enigma.encryptMessage("A");
console.log('encrypted', encrypted1);
