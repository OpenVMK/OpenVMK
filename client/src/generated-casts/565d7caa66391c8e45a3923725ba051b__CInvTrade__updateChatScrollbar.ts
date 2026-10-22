// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / updateChatScrollbar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateChatScrollbar(_me: LingoMe, tY: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rScrollbar = callMethod("getElement", meProp(_me, "m_rWindow"), "tra.scrollbar4");
  if (lingoBinary("neq", t_rScrollbar, 0)) {
  callNamed("call", symbol("setScrollOffset"), t_rScrollbar, tY)
  }

  }

}

