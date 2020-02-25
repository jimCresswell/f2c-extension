/**
 * Recursively walk the DOM from the supplied parent node,
 * modifying text nodes with the supplied modifier function.
 *
 * Approach taken from https://github.com/panicsteve/cloud-to-butt
 *
 * @param {DOM text node} node
 * @param {Function} textModifier
 */
function domWalk(node, textModifier) {
  let child;
  let next;

  if (typeof textModifier !== 'function') {
    throw new TypeError(`Expected text modifier function, received: ${textModifier}`);
  }

  const tagName = node.tagName ? node.tagName.toLowerCase() : '';
  if (tagName === 'input' || tagName === 'textarea') {
    return;
  }
  // Allow content classes to disable modification.
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
        domWalk(child, textModifier);
        child = next;
      }
      break;
    case 3: // Text node
      // The main event.
      /* eslint-disable no-param-reassign */
      node.nodeValue = textModifier(node.nodeValue);
      /* eslint-enable no-param-reassign */
      break;
    default:
      break;
  }
}

export default domWalk;
