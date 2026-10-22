// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CRoomObjectType31 / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("put", "Photoalbum object removed")
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_albumview"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_albumview")))
  }

  return callNamed("callAncestor", symbol("deconstruct"), _me);
}

