type ReflectorID = 'A' | 'B' | 'C' | 'B Thin' | 'C Thin' | 'Beta' | 'Gamma';

export interface ReflectorInterface {
  type: ReflectorID;
  reflectionTable: { [k: string]: string };

  encrypt: (letter: string) => string;
}
