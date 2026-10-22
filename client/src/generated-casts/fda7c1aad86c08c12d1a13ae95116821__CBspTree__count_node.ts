// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / count_node

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function count_node(_me: LingoMe, a_node: LingoValue, a_counter: LingoValue) {
  for (var tChild of a_node.children.toArray()) {
  a_counter = callMethod("count_node", _me, tChild, a_counter);
  }

  a_counter = lingoBinary("add", a_counter, 1);
  return a_counter;
}

