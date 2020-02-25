import { expect } from 'chai';
import f2cModifier from './modifier';

// const { expect } = require('chai');

const willModify = [
  {
    input: '50F',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50 f',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50 °F',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50ºf',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50 Fahrenheit',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50 degrees Fahrenheit',
    output: '10.00 degrees Celsius',
  },
  {
    input: '-50 Fahrenheit',
    output: '-45.56 degrees Celsius',
  },
  {
    input: 'minus 50 degrees F',
    output: '-45.56 degrees Celsius',
  },
];

const willNotModify = [
  '50 ft',
  '50ft',
  '50 Ft',
  '50 feet',
  '50 Feet',
  '-50 feet',
  '50 frogs',
];

// Dynamically generate test scenarios.
describe('The modifier', () => {
  // Should modify these values.
  describe('will modify', () => {
    willModify.forEach((scenario) => {
      it(scenario.input, () => {
        const actual = f2cModifier(scenario.input);
        expect(actual).to.equal(scenario.output);
      });
    });
  });

  // Should not modify these values.
  describe('will not modify', () => {
    willNotModify.forEach((input) => {
      it(input, () => {
        const actual = f2cModifier(input);
        expect(actual).to.equal(input);
      });
    });
  });
});
