import f2cModifier from './lib/modifier';
import domWalk from './lib/dom_walk';

domWalk(document.body, f2cModifier);
