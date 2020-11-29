"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var Machine_1 = require("./components/Machine");
clear_1.default();
console.log(chalk_1.default.bgGreen(figlet_1.default.textSync('ENIGMA', { font: 'Doom' })));
console.log("\nWelcome to Enigma Machine v0.3.1.\nType \".help\" for more information.\n\n");
console.log("\nThe Wehrmacht used the following abbreviations:\nKLAM = Parenthesis\nZZ = Comma\nX = Full stop (end of sentence)\nYY = Point or dot\nX****X = Inverted commas\nQuestion mark (Fragezeichen in German) was usually abbreviated to FRAGE, FRAGEZ or FRAQ.\nForeign names, places, etc. are delimited twice by \"X\" as in XPARISXPARISX or XFEUERSTEINX\nThe letters CH were written as Q. ACHT became AQT, RICHTUNG became RIQTUNG\nNumbers were written out as NULL EINZ ZWO DREI VIER FUNF SEQS SIEBEN AQT NEUN\nIt was prohibited to encipher the word \"NULL\" several times in succession, so they used CENTA (00), MILLE\n(000) and MYRIA (0000). Some examples: 200 = ZWO CENTA, 00780 = CENTA SIEBEN AQT NULL. \n");
console.log("\nExample of settings:\n---------------------------------------------------------------------------------\nTag | Walzenlage | Ringstellung |      Steckerverbindungen      |   Kenngruppen\n---------------------------------------------------------------------------------\n31  |   I II V   |   06 22 14   | PO ML IU KJ NH YT GB VF RE DC | EXS TGY IKJ LOP\n30  |  III IV II |   17 04 26   | BN VC XS WQ AZ GT YH JU IK PM | KIJ TFR BVC ZAE\n29  |   V I III  |   15 02 09   | ML KJ HG FD SQ TR EZ IU BV XC | QZE TRF IOU TGB \n");
console.log("\nAuthentic Wartime Message from the Russian Front\n\nThe message was sent by the commander of the SS-Totenkopf Division (SS-T), also known as 3\nSS-Panzergrenadier-Division Totenkopf, a division of the Waffen-SS. The message was destined to\nthe LVI (56) Armee Korps. In April 1941, SS-T was ordered east to join Heeresgruppe Nord, which\nformed the northern wing of operation Barbarossa, the campaign against Russia. SS-T saw action in\nLithuania and Latvia, and breached the Stalin Line in July 1941. The message from July 7 contains a\nsituation report on SS Panzer Regiment 3 and its 1st Battalion. \n\nThe settings as recovered by the CSG codebreakers:\n--------------------------------------------\nMaschine     | Wehrmacht Enigma I\nUKW          | B\nWalzenlage   | 2 4 5\nRingstellung | BUL\nStecker      | AV BS CG DL FU HZ IN KM OW RX \n--------------------------------------------\n\nThe Message:\n\nBefordert am: 07.07.1941 1925 Uhr Durch:\nFunkspruch Nr.:20 Von/An: f8v/bz2\nAbsendende Stelle : SS-T Div Kdr An: LVI A.K.\nfuer m7g 1840 - 2tl 1t 179 - WXC KCH \u2013\nRFUGZ EDPUD NRGYS ZRCXN\nUYTPO MRMBO FKTBZ REZKM\nLXLVE FGUEY SIOZV EQMIK\nUBPMM YLKLT TDEIS MDICA\nGYKUA CTCDO MOHWX MUUIA\nUBSTS LRNBZ SZWNR FXWFY\nSSXJZ VIJHI DISHP RKLKA\nYUPAD TXQSP INQMA TLPIF\nSVKDA SCTAC DPBOP VHJK\n2tl 155 - CRS YPJ -\nFNJAU SFBWD NJUSE GQOBH\nKRTAR EEZMW KPPRB XOHDR\nOEQGB BGTQV PGVKB VVGBI\nMHUSZ YDAJQ IROAX SSSNR\nEHYGG RPISE ZBOVM QIEMM\nZCYSG QDGRE RVBIL EKXYQ\nIRGIR QNRDN VRXCY YTNJR \n\n");
inquirer_1.default
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
        message: "Select ring setting for first Rotor (1-26): ",
        default: function () { return '1'; },
        validate: function (value) {
            if (/\d/.test(value) && value.length === 1) {
                return true;
            }
            return 'Please enter only digits';
        },
    },
    {
        type: 'input',
        name: 'rotor3position',
        message: "Select position for first Rotor (A-Z): ",
        default: function () { return 'A'; },
        validate: function (value) {
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
        message: "Select ring setting for second Rotor (1-26): ",
        default: function () { return '1'; },
        validate: function (value) {
            if (/\d/.test(value) && value.length === 1) {
                return true;
            }
            return 'Please enter only digits';
        },
    },
    {
        type: 'input',
        name: 'rotor2position',
        message: "Select position for second Rotor (A-Z): ",
        default: function () { return 'A'; },
        validate: function (value) {
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
        message: "Select ring setting for third Rotor (1-26): ",
        default: function () { return '1'; },
        validate: function (value) {
            if (/\d/.test(value) && value.length === 1) {
                return true;
            }
            return 'Please enter only digits';
        },
    },
    {
        type: 'input',
        name: 'rotor1position',
        message: "Select position for third Rotor (A-Z): ",
        default: function () { return 'A'; },
        validate: function (value) {
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
        choices: [
            'B',
            'C',
        ],
    },
    {
        type: 'input',
        name: 'plugboard',
        message: "Enter plugboard setting (e.g. 'AB CD EF'): ",
        default: function () { return ''; },
    },
    {
        type: 'input',
        name: 'text',
        message: 'Enter you message for encrypt: ',
    },
])
    .then(function (answers) {
    var machineSetting = {
        reflectorType: answers.reflector,
        rotorSettings: [
            {
                type: answers.rotor1type.toUpperCase(),
                position: answers.rotor1position,
                ringSetting: answers.rotor1ringSetting
            },
            {
                type: answers.rotor2type.toUpperCase(),
                position: answers.rotor2position,
                ringSetting: answers.rotor2ringSetting
            },
            {
                type: answers.rotor3type.toUpperCase(),
                position: answers.rotor3position,
                ringSetting: answers.rotor3ringSetting
            },
        ],
        debug: false,
    };
    var enigma = new Machine_1.Machine(machineSetting);
    console.log(chalk_1.default.red('Encrypted message: '));
    console.log(chalk_1.default.green(enigma.encryptMessage(answers.text)));
})
    .catch(function (error) {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    }
    else {
        // Something else went wrong
    }
});
