// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoIconPulser / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("deleteAll", meProp(_me, "m_pElements"))
  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

