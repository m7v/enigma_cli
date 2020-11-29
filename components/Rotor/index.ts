import { RotorInterface } from './types';
import { STARTING_CODE_OF_LATIN_LETTERS, ALPHABET_LETTERS_COUNT, ALPHABET } from '../utils';

export type RotorSetting = {
    type: RotorInterface['type'];
    ringSetting?: number;
    position?: string
}

export class Rotor implements RotorInterface {
    type: RotorInterface['type'];
    innerRingPosition: number;

    turnoverCountdown: number;

    wires: {[k: string]: string};
    inverseWires: {[k: string]: string};

    constructor(p: RotorSetting) {
        const { type, position = 'A', ringSetting = 1 } = p;
        this.turnoverCountdown = 0;
        this.wires = {};
        this.inverseWires = {};

        this.type = type;
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
                offsetLetterCode += 26;
            }
            return this.inverseWires[String.fromCharCode(STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode)];
        } else {
            const outputLetterCode = this.wires[letter].charCodeAt(0) - 'A'.charCodeAt(0);

            let offsetLetterCode = (outputLetterCode - this.innerRingPosition) % ALPHABET_LETTERS_COUNT;
            if (offsetLetterCode < 0) {
                offsetLetterCode += 26
            }

            return String.fromCharCode(STARTING_CODE_OF_LATIN_LETTERS + offsetLetterCode);
        }
    }

    public step() {
        this.stepWires();
        this.turnover();
        this.innerRingPosition += 1;
    }

    private setupWires() {
        const wiringTable = this.getWiresByRotorId(this.type);
        for (let i = 0; i < ALPHABET.length; i++) {
            this.wires[ALPHABET[i]] = wiringTable[i];
            this.inverseWires[wiringTable[i]] = ALPHABET[i];
        }
    }

    private setInitialPosition(initialPosition: string) {
        const letterCode = initialPosition.charCodeAt(0) - STARTING_CODE_OF_LATIN_LETTERS;

        for (let i = 0; i < letterCode; i++) {
            this.step();
        }
    }

    private setInnerPosition(innerRingPosition: number) {
        // Позиции в машине устанавливаются с 1 до 26.
        const numberOfSteps = innerRingPosition - 1;
        for (let i = 0; i < 26 - numberOfSteps; i++) {
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
    };

    private stepWires() {
        for (let i = 0; i < ALPHABET.length; i++) {
            const currentLetter = ALPHABET[i];
            const nextLetter = ALPHABET[(i + 1) % ALPHABET_LETTERS_COUNT];
            this.wires[currentLetter] = this.wires[nextLetter];

            this.inverseWires[this.wires[currentLetter]] = currentLetter;
        }
    }

    private setTurnoverLetter() {
        this.turnoverCountdown = this.getTurnoverNotchPositions();
    };

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
    }

    private getTurnoverNotchPositions = () => {
        switch (this.type) {
            case 'I':
                return 'R'.charCodeAt(0);
            case 'II':
                return 'F'.charCodeAt(0);
            case 'III':
                return 'W'.charCodeAt(0);
            case 'IV':
                return 'K'.charCodeAt(0);
            case 'V':
                return 'A'.charCodeAt(0);
        }
    }
}
