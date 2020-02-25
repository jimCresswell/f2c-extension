/**
 * Convert a string or number representation of a temperature from Fahrenheit to Celsius.
 *
 * @param {string|number} f Temperature in degrees Fahrenheit.
 * @returns Temperature in degrees Celsius
 */
function f2c(f) {
  const tempF = parseInt(f, 10);
  return (5 / 9) * (tempF - 32);
}

/**
 * Replace a string containing a Fahrenheit temperature with a Celsius temperature.
 * For use with `String.prototype.replace`.
 *
 * @param {string} match
 * @param {string} negativeTemp
 * @param {string} tempF
 * @param {string} optionalClosingBrace
 * @returns The modified string.
 */
function replaceFahrenheit(match, negativeTemp, tempF, optionalClosingBrace) {
  const sign = negativeTemp === undefined ? 1 : -1;
  const tempC = f2c(sign * tempF).toFixed(2);

  return `${tempC} degrees Celsius${optionalClosingBrace}`;
}

/**
 * Same as `replaceFahrenheit` but for a range specified by two temperatures.
 *
 * @param {string} match
 * @param {string} negative1
 * @param {string} tempF1
 * @param {string} negative2
 * @param {string} tempF2
 * @param {string} optionalClosingBrace
 * @returns The modified string.
 */
function replaceFahrenheitRange(match, negative1, tempF1, negative2, tempF2, optionalClosingBrace) {
  const sign1 = negative1 === undefined ? 1 : -1;
  const tempC1 = f2c(sign1 * tempF1).toFixed(2);
  const sign2 = negative2 === undefined ? 1 : -1;
  const tempC2 = f2c(sign2 * tempF2).toFixed(2);

  return `${tempC1} to ${tempC2} degrees Celsius${optionalClosingBrace}`;
}

/**
 * Given a string, modify it according to a matching regex and a template.
 *
 * @todo detect negative numbers
 * @todo detect temp ranges e.g. 60 - 70F
 * @todo create a unit test for string matches and results.
 *
 * @param {string} text
 * @returns The modified text.
 */
function f2cModifier(text) {
  // Note: I don't think complex regexes are a good way to solve
  // complex problems, but they are fun in a demo.
  const rIsRange = /\d+\s*(?:[-]|to)\s*([-]|minus )?\d+/gi;
  const rFahrenheitText = /([-]|minus )?(\d+)\s?(?:[º°]|degrees)?\s?F(?:ahrenheit)?(\)?)\b/gi;
  const rFahrenheitRangeText = /([-]|minus )?(\d+)\s*(?:[-]|to)\s*([-]|minus )?(\d+)\s?(?:[º°]|degrees)?\s?F(?:ahrenheit)?(\)?)\b/gi;

  // Is this a temperature range?
  const isRange = rIsRange.test(text);

  // No, it's a simple temperature.
  if (!isRange) {
    return text.replace(rFahrenheitText, replaceFahrenheit);
  }

  // Possible temperature range.
  // The range should include a Fahrenheit indicator.
  const isFahrenheit = rFahrenheitText.test(text);
  // It is a range but isn't a Fahrenheit temperature, do nothing.
  if (!isFahrenheit) {
    return text;
  }

  // It is a Fahrenheit temperature range.
  return text.replace(rFahrenheitRangeText, replaceFahrenheitRange);
}

export default f2cModifier;
