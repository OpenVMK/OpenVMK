// fb329984daeb374016fc0289347418de.cct / CRoomObjectType3008 / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_view"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_view")))
  }

  return callNamed("callAncestor", symbol("deconstruct"), _me);
}

