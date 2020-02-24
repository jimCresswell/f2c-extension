function f2c(f) {
    return (5/9) * (f - 32);
}

// Approach taken from https://github.com/panicsteve/cloud-to-butt 
function walk(node) {
    var child, next;

    var tagName = node.tagName ? node.tagName.toLowerCase() : "";
    if (tagName == 'input' || tagName == 'textarea') {
        return;
    }
    if (node.classList && node.classList.contains('ace_editor')) {
        return;
    }

    switch (node.nodeType) {
        case 1:  // Element
        case 9:  // Document
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
    }
}

function handleText(textNode) {
    var v = textNode.nodeValue;

    /**
     * @todo detect negative numbers
     * @todo detect temp ranges e.g. 60-70F
     * @todo create a unit test for string matches and results.
     */
    // Doesn't match ft (feet)
    // Initial test against https://www.rhs.org.uk/advice/profile?pid=664
    rFahrenheitText = /(\d+)\w?(?:º|degrees)?\w?F(\)?)\b/gi;

    v = v.replace(rFahrenheitText, function(match, tempF, optionalClosingBrace) {
        return `${f2c(tempF).toFixed(2)} degrees Celsius${optionalClosingBrace}`;
    });

    textNode.nodeValue = v;
}

walk(document.body);


