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
