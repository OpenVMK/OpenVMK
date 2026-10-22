// item_2355.cct / CCheckersGamePiece / TrickConsumed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrickConsumed(_me: LingoMe, _this: LingoValue, a_iTrickType: LingoValue) {
  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "m_ar_iTricks"), a_iTrickType), 0)) {
  callMethod("deleteOne", meProp(_me, "m_ar_iTricks"), a_iTrickType)
  }

}

