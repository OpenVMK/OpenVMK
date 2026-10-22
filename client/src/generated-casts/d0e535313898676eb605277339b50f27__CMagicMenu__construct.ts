// d0e535313898676eb605277339b50f27.cct / CMagicMenu / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sWindowID", "MagicWindow");
  setMeProp(_me, "m_mp_FxList", new LingoPropList([]));
  setMeProp(_me, "m_iMagicStatus", 0);
  setMeProp(_me, "m_EventAgent_obj", undefined);
  setMeProp(_me, "m_iItemId", undefined);
  setMeProp(_me, "m_iActiveFx", -float(1));
  setMeProp(_me, "m_iSelectedFx", undefined);
  setMeProp(_me, "m_arAvailableTimes", undefined);
  setMeProp(_me, "m_iTelePortFxId", undefined);
  setMeProp(_me, "m_bMagicMenuOpened", 0);
  setMeProp(_me, "m_rGrid", callNamed("createObject", callNamed("getUniqueID"), "CGenericThumbnailGrid"));
  if (callNamed("memberExists", "magic.timer")) {
  setMeProp(_me, "m_rWaitImage", callNamed("getMember", "magic.timer").image);
  } else {
  setMeProp(_me, "m_rWaitImage", callNamed("image", 1, 1, 32));
  }

  callNamed("registerMessage", "ui_Magic", callMethod("getID", _this), symbol("showHideMagic"))
  callNamed("registerMessage", "close_Magic", callMethod("getID", _this), symbol("_Close"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _this), symbol("_Close"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("_Close"))
  callMethod("regMsgList", _this, 1)
  return 1;
}

