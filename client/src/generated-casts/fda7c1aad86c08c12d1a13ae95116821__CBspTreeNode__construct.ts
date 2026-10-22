// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTreeNode / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "dimensions", new LingoList([]));
  setMeProp(_me, "children", new LingoList([]));
  setMeProp(_me, "obj", undefined);
  setMeProp(_me, "isleaf", 0);
  return 1;
}

