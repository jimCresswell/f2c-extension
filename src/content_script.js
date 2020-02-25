import f2cModify from './lib/modify';
import domWalk from './lib/dom_walk';

domWalk(document.body, f2cModify);
