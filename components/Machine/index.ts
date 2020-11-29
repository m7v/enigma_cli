import { Reflector } from "../Reflector";
import { Plugboard } from "../Plugboard";
import { Rotor, RotorSetting } from "../Rotor";

export class Machine {
    reflector: Reflector;
    rotors: Rotor[];
    plugboard?: Plugboard;
    debug: boolean;

    constructor(p: {
        reflectorType: Reflector['type'],
        rotorSettings: [
            RotorSetting,
            RotorSetting,
            RotorSetting
        ],
        plugboardPairs?: string,
        debug?: boolean,
    }) {
        const { reflectorType, rotorSettings, plugboardPairs, debug = false } = p;
        this.debug = debug;
        if (plugboardPairs) {
            this.plugboard = new Plugboard({ plugboardPairs });
        }
        this.rotors = [
            new Rotor(rotorSettings[0]),
            new Rotor(rotorSettings[1]),
            new Rotor(rotorSettings[2]),
        ];
        this.reflector = new Reflector({ type: reflectorType });

        this.log('========= Plugboard ==========');
        this.log(`Plugs | ${plugboardPairs}`);
        this.log('========= 1st Rotor ==========');
        this.log(`Type | ${rotorSettings[0].type}`);
        this.log(`Ring setting | ${rotorSettings[0].ringSetting}`);
        this.log(`Start position | ${rotorSettings[0].position}`);
        this.log('========= 2nd Rotor ==========');
        this.log(`Type | ${rotorSettings[1].type}`);
        this.log(`Ring setting | ${rotorSettings[1].ringSetting}`);
        this.log(`Start position | ${rotorSettings[1].position}`);
        this.log('========= 3rd Rotor ==========');
        this.log(`Type | ${rotorSettings[2].type}`);
        this.log(`Ring setting | ${rotorSettings[2].ringSetting}`);
        this.log(`Start position | ${rotorSettings[2].position}`);
        this.log('========= Reflector ==========');
        this.log(`Type | ${reflectorType}`);
    }

    encrypt(letter: string) {
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

        let plugboardDirect = undefined;
        if (this.plugboard) {
            plugboardDirect = this.plugboard.encode(letter);
            this.log('plugboardDirect: ' + letter + ' -> ' + plugboardDirect);
        }

        const rotorsDirect = plugboardDirect
            ? this.encodeWithRotors(plugboardDirect)
            : this.encodeWithRotors(letter);

        const reflectorInverse = this.reflector.encrypt(rotorsDirect);
        this.log('reflectorInverse: ' + rotorsDirect + ' -> ' + reflectorInverse);

        const rotorsInverse = this.encodeInverseWithRotors(reflectorInverse);

        let plugboardInverse = undefined;
        if (this.plugboard) {
            plugboardInverse = this.plugboard.encode(rotorsInverse);
            this.log('plugboardInverse: ' + rotorsInverse + ' -> ' + plugboardInverse);
        }

        return this.plugboard ? plugboardInverse : rotorsInverse;
    }

    private encodeWithRotors(letter: string) {
        let output = '';
        for (var i = 0; i < this.rotors.length; i++) {
            output = this.rotors[i].encrypt(letter);
            this.log('rotor ' + i + ' direct: ' + letter + ' -> ' + output);

            letter = output;
        }

        return output;
    };

    private encodeInverseWithRotors(letter: string) {
        let output = '';
        for (let i = this.rotors.length - 1; i >= 0; i--) {
            output = this.rotors[i].encrypt(letter, true);
            this.log('rotor ' + i + ' inverse: ' + letter + ' -> ' + output);

            letter = output;
        }

        return output;
    }

    private log(message: string) {
        if (this.debug) {
            console.log(message);
        }
    }
}
