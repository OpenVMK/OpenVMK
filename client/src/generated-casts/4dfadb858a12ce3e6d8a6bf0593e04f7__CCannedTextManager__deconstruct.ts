// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("Initialize"), callMethod("getID", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_dictionary"))) ? 0 : 1)) {
  callNamed("removeObject", meProp(_me, "m_dictionary"))
  }

  return 1;
}

