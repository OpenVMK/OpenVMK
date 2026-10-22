// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CRoomObjectType31 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("put", "Photoalbum object created")
  setMeProp(_me, "m_albumview", undefined);
  setMeProp(_me, "m_bReady", 0);
  return callNamed("callAncestor", symbol("construct"), _me);
}

