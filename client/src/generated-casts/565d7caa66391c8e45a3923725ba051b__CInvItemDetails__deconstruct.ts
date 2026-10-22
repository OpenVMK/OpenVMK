// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemDetails / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  return 1;
}

