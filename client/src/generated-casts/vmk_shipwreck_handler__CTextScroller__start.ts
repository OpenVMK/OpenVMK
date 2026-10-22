// vmk_shipwreck_handler.cct / CTextScroller / start

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function start(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_sContent").length, 0)) {
  setMeProp(_me, "m_bActive", 1);
  callNamed("createTimeout", lingoBinary("join", symbol("textscroller_update"), callMethod("getID", _me)), meProp(_me, "m_iSpeed"), symbol("updateScroller"), callMethod("getID", _me), undefined, 0)
  }

}

