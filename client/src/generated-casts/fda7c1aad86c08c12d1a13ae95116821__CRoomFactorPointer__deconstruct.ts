// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPointer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sLastTile", "");
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  setMeProp(_me, "m_veLastScrPos", callNamed("vector"));
  setMeProp(_me, "m_iTileSize", 0);
  if (callNamed("objectp", meProp(_me, "m_rIterator"))) {
  callMethod("clear", meProp(_me, "m_rIterator"))
  setMeProp(_me, "m_rIterator", undefined);
  }

  return 1;
}

