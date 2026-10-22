// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var t_rChild of meProp(_me, "children").toArray()) {
  callMethod("deconstruct", t_rChild)
  t_rChild = undefined;
  }

  setMeProp(_me, "children", new LingoList([]));
  return 1;
}

