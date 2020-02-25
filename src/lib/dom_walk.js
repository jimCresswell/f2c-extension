/**
 * Recursively walk the DOM from the supplied parent node,
 * modifying text nodes with the supplied modifier function.
 *
 * Approach taken from https://github.com/panicsteve/cloud-to-butt
 *
 * @param {DOM text node} node
 * @param {Function} modifier
 */
function domWalk(node, modifier) {
  let child;
  let next;

  if (typeof modifier !== 'function') {
    throw new TypeError(`Expected node modifier function, received: ${modifier}`);
  }

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
        domWalk(child, modifier);
        child = next;
      }
      break;
    case 3: // Text node
      // The main event.
      /** @todo convert from side-effect to return value. */
      modifier(node);
      break;
    default:
      break;
  }
}

export default domWalk;
