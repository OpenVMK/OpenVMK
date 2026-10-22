// fda7c1aad86c08c12d1a13ae95116821.cct / CBspTree / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pRoot"))) ? 0 : 1)) {
  callMethod("deconstruct", meProp(_me, "m_pRoot"))
  }

  setMeProp(_me, "m_pRoot", undefined);
  return 1;
}

