// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / moveMessageToBack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveMessageToBack(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_inbox").count, 0)) {
  var t_msg = meProp(_me, "m_ar_inbox")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_inbox"), 1)
  callMethod("append", meProp(_me, "m_ar_inbox"), t_msg)
  }

}

