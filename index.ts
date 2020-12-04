import clear from 'clear';
import figlet from 'figlet';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Machine } from './components/Machine';
import { RotorSetting } from './components/Rotor';

clear();

console.log(chalk.bgGreen(figlet.textSync('ENIGMA', { font: 'Doom' })));

console.log(`
Welcome to Enigma Machine v0.3.1.
Type ".help" for more information.

`);

console.log(`
The Wehrmacht used the following abbreviations:
KLAM = Parenthesis
ZZ = Comma
X = Full stop (end of sentence)
YY = Point or dot
X****X = Inverted commas
Question mark (Fragezeichen in German) was usually abbreviated to FRAGE, FRAGEZ or FRAQ.
Foreign names, places, etc. are delimited twice by "X" as in XPARISXPARISX or XFEUERSTEINX
The letters CH were written as Q. ACHT became AQT, RICHTUNG became RIQTUNG
Numbers were written out as NULL EINZ ZWO DREI VIER FUNF SEQS SIEBEN AQT NEUN
It was prohibited to encipher the word "NULL" several times in succession, so they used CENTA (00), MILLE
(000) and MYRIA (0000). Some examples: 200 = ZWO CENTA, 00780 = CENTA SIEBEN AQT NULL. 
`);

console.log(`
Example of settings:
---------------------------------------------------------------------------------
Tag | Walzenlage | Ringstellung |      Steckerverbindungen      |   Kenngruppen
---------------------------------------------------------------------------------
31  |   I II V   |   06 22 14   | PO ML IU KJ NH YT GB VF RE DC | EXS TGY IKJ LOP
30  |  III IV II |   17 04 26   | BN VC XS WQ AZ GT YH JU IK PM | KIJ TFR BVC ZAE
29  |   V I III  |   15 02 09   | ML KJ HG FD SQ TR EZ IU BV XC | QZE TRF IOU TGB 
`);

console.log(`
Authentic Wartime Message from the Russian Front

The message was sent by the commander of the SS-Totenkopf Division (SS-T), also known as 3
SS-Panzergrenadier-Division Totenkopf, a division of the Waffen-SS. The message was destined to
the LVI (56) Armee Korps. In April 1941, SS-T was ordered east to join Heeresgruppe Nord, which
formed the northern wing of operation Barbarossa, the campaign against Russia. SS-T saw action in
Lithuania and Latvia, and breached the Stalin Line in July 1941. The message from July 7 contains a
situation report on SS Panzer Regiment 3 and its 1st Battalion. 

The settings as recovered by the CSG codebreakers:
--------------------------------------------
Maschine     | Wehrmacht Enigma I
UKW          | B
Walzenlage   | 2 4 5
Ringstellung | BUL
Stecker      | AV BS CG DL FU HZ IN KM OW RX 
--------------------------------------------

The Message:

Befordert am: 07.07.1941 1925 Uhr Durch:
Funkspruch Nr.:20 Von/An: f8v/bz2
Absendende Stelle : SS-T Div Kdr An: LVI A.K.
fuer m7g 1840 - 2tl 1t 179 - WXC KCH –
RFUGZ EDPUD NRGYS ZRCXN
UYTPO MRMBO FKTBZ REZKM
LXLVE FGUEY SIOZV EQMIK
UBPMM YLKLT TDEIS MDICA
GYKUA CTCDO MOHWX MUUIA
UBSTS LRNBZ SZWNR FXWFY
SSXJZ VIJHI DISHP RKLKA
YUPAD TXQSP INQMA TLPIF
SVKDA SCTAC DPBOP VHJK
2tl 155 - CRS YPJ -
FNJAU SFBWD NJUSE GQOBH
KRTAR EEZMW KPPRB XOHDR
OEQGB BGTQV PGVKB VVGBI
MHUSZ YDAJQ IROAX SSSNR
EHYGG RPISE ZBOVM QIEMM
ZCYSG QDGRE RVBIL EKXYQ
IRGIR QNRDN VRXCY YTNJR 

`);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'rotor3type',
      message: 'Select first Rotor (from left to right): ',
      choices: ['I', 'II', 'III', 'IV', 'V'],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'rotor3ringSetting',
      message: 'Select ring setting for first Rotor (1-26): ',
      default: () => '1',
      validate: (value) => {
        if (/\d/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only digits';
      },
    },
    {
      type: 'input',
      name: 'rotor3position',
      message: 'Select position for first Rotor (A-Z): ',
      default: () => 'A',
      validate: (value) => {
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only latin alphabet symbol';
      },
    },
    {
      type: 'list',
      name: 'rotor2type',
      message: 'Select second Rotor (from left to right)',
      choices: ['I', 'II', 'III', 'IV', 'V'],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'rotor2ringSetting',
      message: 'Select ring setting for second Rotor (1-26): ',
      default: () => '1',
      validate: (value) => {
        if (/\d/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only digits';
      },
    },
    {
      type: 'input',
      name: 'rotor2position',
      message: 'Select position for second Rotor (A-Z): ',
      default: () => 'A',
      validate: (value) => {
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only latin alphabet symbol';
      },
    },
    {
      type: 'list',
      name: 'rotor1type',
      message: 'Select third Rotor (from left to right)',
      choices: ['I', 'II', 'III', 'IV', 'V'],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'rotor1ringSetting',
      message: 'Select ring setting for third Rotor (1-26): ',
      default: () => '1',
      validate: (value) => {
        if (/\d/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only digits';
      },
    },
    {
      type: 'input',
      name: 'rotor1position',
      message: 'Select position for third Rotor (A-Z): ',
      default: () => 'A',
      validate: (value) => {
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(value) && value.length === 1) {
          return true;
        }

        return 'Please enter only latin alphabet symbol';
      },
    },
    {
      type: 'list',
      name: 'reflector',
      message: 'Select reflector: ',
      choices: ['B', 'C'],
    },
    {
      type: 'input',
      name: 'plugboard',
      message: "Enter plugboard setting (e.g. 'AB CD EF'): ",
      default: () => '',
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter you message for encrypt: ',
    },
  ])
  .then((answers) => {
    const machineSetting = {
      reflectorType: answers.reflector,
      rotorSettings: [
        {
          type: answers.rotor1type.toUpperCase(),
          position: answers.rotor1position,
          ringSetting: answers.rotor1ringSetting,
        } as RotorSetting,
        {
          type: answers.rotor2type.toUpperCase(),
          position: answers.rotor2position,
          ringSetting: answers.rotor2ringSetting,
        } as RotorSetting,
        {
          type: answers.rotor3type.toUpperCase(),
          position: answers.rotor3position,
          ringSetting: answers.rotor3ringSetting,
        } as RotorSetting,
      ],
      debug: false,
    };

    const enigma = new Machine(machineSetting);
    console.log(chalk.red('Encrypted message: '));
    console.log(chalk.green(enigma.encryptMessage(answers.text)));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
