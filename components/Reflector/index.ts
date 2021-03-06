import { ReflectorInterface } from './types';
import { ALPHABET_LETTERS_COUNT, ALPHABET } from '../utils';

export class Reflector implements ReflectorInterface {
  reflectionTable: { [k: string]: string };

  constructor(public type: ReflectorInterface['type']) {
    this.reflectionTable = {};
    this.setReflectionTable();
  }

  private setReflectionTable() {
    const reflectionWires = this.getAlphabetByReflectorId();

    for (let i = 0; i < ALPHABET_LETTERS_COUNT; i++) {
      this.reflectionTable[ALPHABET[i]] = reflectionWires[i];
    }
  }

  public encrypt(letter: string) {
    return this.reflectionTable[letter];
  }

  private getAlphabetByReflectorId() {
    switch (this.type) {
      case 'A':
        return 'EJMZALYXVBWFCRQUONTSPIKHGD';
      case 'B':
        return 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
      case 'C':
        return 'FVPJIAOYEDRZXWGCTKUQSBNMHL';
      case 'B Thin':
        return 'ENKQAUYWJICOPBLMDXZVFTHRGS';
      case 'C Thin':
        return 'RDOBJNTKVEHMLFCWZAXGYIPSUQ';
      case 'Beta':
        return 'LEYJVCNIXWPBQMDRTAKZGFUHOS';
      case 'Gamma':
        return 'FSOKANUERHMBTIYCWLQPZXVGJD';
    }
  }
}
