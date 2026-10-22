// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iTileSize", new LingoPropList([]));
  setMeProp(_me, "m_bValid", 0);
  if (callNamed("objectp", meProp(_me, "m_pBsp"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pBsp")))
  }

  return 1;
}

