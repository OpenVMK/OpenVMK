// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWndName"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndName"))
  }

  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridRenderer")))
  setMeProp(_me, "m_rGridRenderer", undefined);
  }

  callMethod("regMsgList", _me, 0)
}

