export class Plugboard {
  plugs: { [k: string]: string };

  constructor(public plugboardPairs: string) {
    this.plugs = {};
    this.addPlugs(plugboardPairs);
  }

  public encode(letter: string) {
    if (letter in this.plugs) return this.plugs[letter];
    return letter;
  }

  private addPlugs(plugboardPairs: string) {
    const pairs = plugboardPairs.split(' ');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      this.addPlug(pair.charAt(0), pair.charAt(1));
    }
  }

  private addPlug(letter1: string, letter2: string) {
    this.plugs[letter1] = letter2;
    this.plugs[letter2] = letter1;
  }
}
