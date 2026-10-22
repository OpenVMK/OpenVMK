// vmk_casual_checkers.cct / CCheckersTrick / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rPiece"))) {
  if (callNamed("objectp", meProp(_me, "m_rAnimation"))) {
  if ((lingoTruthy(callMethod("IsPlaying", meProp(_me, "m_rAnimation"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", _this))
  }

  }

  }

}

