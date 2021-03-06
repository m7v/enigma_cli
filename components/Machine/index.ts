import { Reflector } from '../Reflector';
import { Plugboard } from '../Plugboard';
import { Rotor, RotorSetting } from '../Rotor';

export class Machine {
  reflector: Reflector;
  rotors: Rotor[];
  plugboard?: Plugboard;
  debug: boolean;

  constructor(p: {
    reflectorType: Reflector['type'];
    rotorSettings: RotorSetting[];
    plugboardPairs?: string;
    debug?: boolean;
  }) {
    const { reflectorType, rotorSettings, plugboardPairs, debug = false } = p;
    this.debug = debug;
    if (plugboardPairs) {
      this.plugboard = new Plugboard(plugboardPairs);
    }
    this.rotors = [
      new Rotor(rotorSettings[0]),
      new Rotor(rotorSettings[1]),
      new Rotor(rotorSettings[2]),
    ];
    this.reflector = new Reflector(reflectorType);

    this.log('========= Plugboard ==========');
    this.log(`Plugs | ${plugboardPairs}`);
    this.log('========= 1st Rotor ==========');
    this.log(`Type | ${this.rotors[0].type}`);
    this.log(`Ring setting | ${this.rotors[0].ringSetting}`);
    this.log(`Start position | ${this.rotors[0].position}`);
    this.log('========= 2nd Rotor ==========');
    this.log(`Type | ${this.rotors[1].type}`);
    this.log(`Ring setting | ${this.rotors[1].ringSetting}`);
    this.log(`Start position | ${this.rotors[1].position}`);
    this.log('========= 3rd Rotor ==========');
    this.log(`Type | ${this.rotors[2].type}`);
    this.log(`Ring setting | ${this.rotors[2].ringSetting}`);
    this.log(`Start position | ${this.rotors[2].position}`);
    this.log('========= Reflector ==========');
    this.log(`Type | ${reflectorType}`);
  }

  encryptMessage(text: string): string {
    const encryptedText = text
      .split('')
      .filter((l) => l !== ' ')
      .map((letter) => this.encryptLetter(letter))
      .join('') as string;
    const temp1 = encryptedText.match(/.{0,5}/g) || [];
    const temp2 =
      temp1
        .map((l) => l.trim())
        .join(' ')
        .match(/.{0,23}/g) || [];
    return temp2.map((l) => l.trim()).join('\n');
  }

  encryptLetter(inpLetter: string): string {
    const matchLetter = inpLetter.toUpperCase().match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/);
    if (!matchLetter) {
      return inpLetter;
    }
    const letter = matchLetter[0];
    // Double stepping anomaly
    // Rotors turns over the rotor on their right as well. This is not noticed
    // in rotor 0 because it always steps anyway.
    if (this.rotors[1].turnoverCountdown == 1 && this.rotors[2].turnoverCountdown == 1) {
      this.rotors[1].step();
    }

    // Update rotor position after encoding
    this.rotors[0].step();
    if (this.rotors[0].turnoverCountdown === 26) {
      this.rotors[1].step();
      if (this.rotors[1].turnoverCountdown === 26) {
        this.rotors[2].step();
      }
    }

    this.log('Machine encoding');
    this.log('letter: ' + letter);
    this.log(
      `Rotors Position: ${this.rotors[2].position}${this.rotors[1].position}${this.rotors[0].position}`,
    );

    let plugboardDirect = undefined;
    if (this.plugboard) {
      plugboardDirect = this.plugboard.encode(letter);
      this.log('plugboardDirect: ' + letter + ' -> ' + plugboardDirect);
    }

    const rotorsDirect = plugboardDirect
      ? this.encodeWithRotors(plugboardDirect)
      : this.encodeWithRotors(letter);

    const reflectorInverse = this.reflector.encrypt(rotorsDirect);
    this.log(`reflectorInverse ${this.reflector.type}: ${rotorsDirect} -> ${reflectorInverse}`);

    const rotorsInverse = this.encodeInverseWithRotors(reflectorInverse);

    if (this.plugboard) {
      const plugboardInverse = this.plugboard.encode(rotorsInverse);
      this.log('plugboardInverse: ' + rotorsInverse + ' -> ' + plugboardInverse);
      return plugboardInverse;
    }

    return rotorsInverse;
  }

  private encodeWithRotors(letter: string) {
    let output = '';
    for (let i = 0; i < this.rotors.length; i++) {
      output = this.rotors[i].encrypt(letter);
      this.log(`rotor ${this.rotors[i].type} direct: ${letter} -> ${output}`);

      letter = output;
    }

    return output;
  }

  private encodeInverseWithRotors(letter: string) {
    let output = '';
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      output = this.rotors[i].encrypt(letter, true);
      this.log(`rotor ${this.rotors[i].type} inverse: ${letter} -> ${output}`);

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
