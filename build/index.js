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
