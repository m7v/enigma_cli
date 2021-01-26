import { RotorInterface } from './types';
import { STARTING_CODE_OF_LATIN_LETTERS, ALPHABET_LETTERS_COUNT, ALPHABET } from '../utils';

export type RotorSetting = {
  type: RotorInterface['type'];
  ringSetting?: number;
  position?: string;
};

export class Rotor implements RotorInterface {
  type: RotorInterface['type'];
  innerRingPosition: number;
  turnoverCountdown: number;
  ringSetting: number;
  position: string;

  wires: { [k: string]: string };
  inverseWires: { [k: string]: string };

  constructor(p: RotorSetting) {
    const { type, position = 'A', ringSetting = 1 } = p;
    this.turnoverCountdown = 0;
    this.wires = {};
    this.inverseWires = {};
    this.type = type;
    this.position = position;
    this.ringSetting = ringSetting;

    this.innerRingPosition = 0;

    this.setupWires();
    this.setTurnoverLetter();
    this.setInnerPosition(ringSetting);
    this.setInitialPosition(position.toUpperCase());
  }

  public encrypt(letter: string, inverseStep: boolean = false) {
    const letterCode = letter.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;

    if (inverseStep) {
      let offsetLetterCode = (letterCode + this.innerRingPosition) % ALPHABET_LETTERS_COUNT;
      if (offsetLetterCode < 0) {
        offsetLetterCode += ALPHABET_LETTERS_COUNT;
      }
      return this.inverseWires[
        String.fromCharCode(STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode)
      ];
    } else {
      const outputLetterCode = this.wires[letter].charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;

      let offsetLetterCode = (outputLetterCode - this.innerRingPosition) % ALPHABET_LETTERS_COUNT;
      if (offsetLetterCode < 0) {
        offsetLetterCode += ALPHABET_LETTERS_COUNT;
      }

      return String.fromCharCode(STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode);
    }
  }

  public step(initStep: boolean = false) {
    this.stepWires();
    this.turnover();
    this.innerRingPosition += 1;

    // Меняем позицию внутри ротора. Т.к. шаг = 1, мы всегда просто смещаем на 1 шаг.
    const baseLetter = initStep ? STARTING_CODE_OF_LATIN_LETTERS : this.position.charCodeAt(0);
    this.position = String.fromCharCode(
      STARTING_CODE_OF_LATIN_LETTERS +
        ((baseLetter + 1 - STARTING_CODE_OF_LATIN_LETTERS) % ALPHABET_LETTERS_COUNT),
    );
  }

  private setupWires() {
    const wiringTable = this.getWiresByRotorId(this.type);
    const wiringTableArray = wiringTable.split('');
    const alphabetArray = ALPHABET.split('');
    for (let i = 0; i < ALPHABET_LETTERS_COUNT; i++) {
      this.wires[alphabetArray[i]] = wiringTableArray[i];
      this.inverseWires[wiringTableArray[i]] = alphabetArray[i];
    }
  }

  private setInitialPosition(initialPosition: string) {
    const letterCode = initialPosition.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;

    for (let i = 0; i < letterCode; i++) {
      // На первом шаге у нас всегда A,
      // а дальше мы вращаем ротор на то кол-во, которое указали при инициализации.
      this.step(i === 0);
    }
  }

  private setInnerPosition(innerRingPosition: number) {
    // Позиции в машине устанавливаются с 1 до 26.
    const numberOfSteps = innerRingPosition - 1;
    if (!numberOfSteps) {
      return;
    }
    for (let i = 0; i < ALPHABET_LETTERS_COUNT - numberOfSteps; i++) {
      this.stepWires();
      this.innerRingPosition += 1;
    }
  }

  private turnover() {
    this.turnoverCountdown -= 1;

    if (this.turnoverCountdown === 0) {
      // Как только мы нашли нужную букву, через которую сделали переход.
      // Мы должны обновить значение countdown'а (потому что до этой буквы нужно пройти весь алфавит)
      this.turnoverCountdown = ALPHABET_LETTERS_COUNT;
    }
  }

  private stepWires() {
    let newWires: { [k: string]: string } = {};
    for (let i = 0; i < ALPHABET_LETTERS_COUNT; i++) {
      const currentLetter = ALPHABET[i];
      const nextLetter = ALPHABET[(i + 1) % ALPHABET_LETTERS_COUNT];

      newWires[currentLetter] = this.wires[nextLetter];
      this.inverseWires[this.wires[currentLetter]] = currentLetter;
    }
    this.wires = newWires;

    for (let i = 0; i < ALPHABET_LETTERS_COUNT; i++) {
      let letter = ALPHABET[i];
      let encodedLetter = this.wires[letter];
      this.inverseWires[encodedLetter] = letter;
    }
  }

  private setTurnoverLetter() {
    this.turnoverCountdown = this.getTurnoverNotchPositions();
  }

  private getWiresByRotorId = (rotorId: RotorInterface['type']) => {
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

  private getTurnoverNotchPositions = () => {
    switch (this.type) {
      case 'I':
        return 'R'.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;
      case 'II':
        return 'F'.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;
      case 'III':
        return 'W'.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;
      case 'IV':
        return 'K'.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;
      case 'V':
        return 'A'.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;
    }
  };
}
