type RotorID = 'I' | 'II' | 'III' | 'IV' | 'V';

export interface RotorInterface {
  type: RotorID;
  innerRingPosition: number;

  turnoverCountdown: number;

  wires: { [k: string]: string };
  inverseWires: { [k: string]: string };

  encrypt: (letter: string, inverseStep: boolean) => string;
  step: () => void;
}
