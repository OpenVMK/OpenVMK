// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / RemoveRoomInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveRoomInfo(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_windowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_windowTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sWhoEntersWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWhoEntersWindow"))
  }

  if (callNamed("objectp", meProp(_me, "m_obj_TicketWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_obj_TicketWindow")))
  setMeProp(_me, "m_obj_TicketWindow", undefined);
  }

}

