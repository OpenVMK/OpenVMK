// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _CancelRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CancelRoom(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  callMethod("_RemoveRoom", _this)
  } else {
  callMethod("hideLoadBar", _this._interface)
  setMeProp(_me, "m_bCancelled", 1);
  }

}

