// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function close(_me: LingoMe, _this: LingoValue) {
  if (_this.m_bReady) {
  if (lingoBinary("eq", _this.m_kCurPageName, symbol("items"))) {
  callNamed("executeMessage", "teleport_unselected", meProp(_me, "m_iLastTeleporterSelection"))
  }

  return callMethod("close", _this.ancestor);
  }

}

