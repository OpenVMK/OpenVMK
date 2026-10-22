// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  callMethod("update", meProp(_me, "m_rFactor"))
  callMethod("update", meProp(_me, "m_rVisual"))
  callNamed("callAncestor", symbol("update"), _this)
  }

}

