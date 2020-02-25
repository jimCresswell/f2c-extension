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
  const rFahrenheitText = /([-]|minus )?(\d+)\s?(?:[º°]|degrees)?\s?F(?:ahrenheit)?(\)?)\b/gi;

  return text.replace(rFahrenheitText, (match, negativeTemp, tempF, optionalClosingBrace) => {
    const sign = negativeTemp === undefined ? 1 : -1;
    const tempC = f2c(sign * tempF).toFixed(2);
    return `${tempC} degrees Celsius${optionalClosingBrace}`;
  });
}

export default f2cModifier;
