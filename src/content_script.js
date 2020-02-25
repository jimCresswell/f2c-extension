function f2c(f) {
  const tempF = parseInt(f, 10);
  return (5 / 9) * (tempF - 32);
}

function handleText(textNode) {
  let v = textNode.nodeValue;

  /**
   * @todo detect negative numbers
   * @todo detect temp ranges e.g. 60-70F
   * @todo create a unit test for string matches and results.
   */
  // Doesn't match ft (feet)
  // Initial test against https://www.rhs.org.uk/advice/profile?pid=664
  const rFahrenheitText = /(\d+)\s?(?:º|degrees)?\s?F(\)?)\b/gi;

  v = v.replace(rFahrenheitText, (match, tempF, optionalClosingBrace) => {
    const tempC = f2c(tempF).toFixed(2);
    return `${tempC} degrees Celsius${optionalClosingBrace}`;
  });

  // The side-effect is deliberate.
  /* eslint-disable no-param-reassign */
  textNode.nodeValue = v;
  /* eslint-enable no-param-reassign */
}

// Approach taken from https://github.com/panicsteve/cloud-to-butt
function walk(node) {
  let child;
  let next;

  const tagName = node.tagName ? node.tagName.toLowerCase() : '';
  if (tagName === 'input' || tagName === 'textarea') {
    return;
  }
  if (node.classList && node.classList.contains('f2c_off')) {
    return;
  }

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
    default:
      break;
  }
}

walk(document.body);
