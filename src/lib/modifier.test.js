import { expect } from 'chai';
import f2cModifier from './modifier';

// Input/output pairs to be exercised as test scenarios.
const willModify = [
  {
    input: '50F',
    output: '10.00 degrees Celsius',
  },
  {
    input: '50F and some words and 50F',
    output: '10.00 degrees Celsius and some words and 10.00 degrees Celsius',
  },
  {
    input: '22 f',
    output: '-5.56 degrees Celsius',
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
  {
    input: '22 to 50 degrees Fahrenheit',
    output: '-5.56 to 10.00 degrees Celsius',
  },
  {
    // Note that because the first temperature has a unit marker this
    // is treated as two separate temperatures rather than a range.
    input: '22F to 50F',
    output: '-5.56 degrees Celsius to 10.00 degrees Celsius',
  },
  {
    input: '22 to 50 degrees Fahrenheit and 10 to 20F',
    output: '-5.56 to 10.00 degrees Celsius and -12.22 to -6.67 degrees Celsius',
  },
  {
    input: 'minus 60 to minus 50 degrees Fahrenheit',
    output: '-51.11 to -45.56 degrees Celsius',
  },
  {
    // The minus sign denotes range rather than a negative number.
    input: '30-50 degrees Fahrenheit',
    output: '-1.11 to 10.00 degrees Celsius',
  },
  {
    input: '30 - minus 50 degrees Fahrenheit',
    output: '-1.11 to -45.56 degrees Celsius',
  },
];

// Strings which should not be matched by the algorithm.
const willNotModify = [
  '50 ft',
  '50ft',
  '50 Ft',
  '50 feet',
  '50 Feet',
  '20 to 30 ft',
];

// Scenarios which are not yet handled.
const pending = [
  {
    description: 'ranges and values in same text node',
    input: '22 to 50 degrees Fahrenheit and then 10F',
    output: '-5.56 to 10.00 degrees Celsius and then -12.22 degrees Celsius',
  },
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

    // Scenarios which are not yet handled.
    pending.forEach((scenario) => {
      it(scenario.description);
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
