// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWndName", "RoomTicketWnd");
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_mp_ItemData", undefined);
  setMeProp(_me, "m_mp_TicketInfo", new LingoPropList([]));
  setMeProp(_me, "m_mp_Tickets", new LingoPropList([]));
  setMeProp(_me, "m_iTicketAmout", 0);
  setMeProp(_me, "m_rGridRenderer", callNamed("createObject", callNamed("getUniqueID"), "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  if (callNamed("memberExists", "previewbox")) {
  setMeProp(_me, "m_rPrevBackImage", callMethod("duplicate", callNamed("getMember", "previewbox").image));
  } else {
  setMeProp(_me, "m_rPrevBackImage", callNamed("image", 100, 100, 32));
  }

  callMethod("regMsgList", _me, 1)
  return 1;
}

