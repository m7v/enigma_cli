import { Machine } from "./components/Machine";
import { RotorSetting } from "./components/Rotor";

const machineSetting = {
  reflectorType: "B" as const,
  rotorSettings: [
    { type: "III", positon: "A", ringSetting: 1 } as RotorSetting,
    { type: "II", position: "A", ringSetting: 1 } as RotorSetting,
    { type: "I", position: "A", ringSetting: 1 } as RotorSetting,
  ],
  debug: true,
};

const enigma = new Machine(machineSetting);

const encrypted1 = enigma.encryptMessage("AAAAA");
console.log("encrypted", encrypted1);
