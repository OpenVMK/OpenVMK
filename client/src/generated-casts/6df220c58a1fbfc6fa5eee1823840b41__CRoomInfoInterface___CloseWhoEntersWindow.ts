// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / _CloseWhoEntersWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CloseWhoEntersWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWhoEntersWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWhoEntersWindow"))
  }

}

