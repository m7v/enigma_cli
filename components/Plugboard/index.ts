export class Plugboard {
    plugs: {[k: string]: string};

    constructor() {
        this.addPlugs.apply(this, arguments);
    }

    public encode(letter) {
        if (letter in this.plugs)
            return this.plugs[letter];
        return letter;
    };

    private addPlugs() {
        for (let i = 0; i < arguments.length; i++) {
            const letters = arguments[i];
            this.addPlug(letters.charAt(0), letters.charAt(1));
        }
    };

    private addPlug(letter1, letter2) {
        this.plugs[letter1] = letter2;
        this.plugs[letter2] = letter1;
    };
}
