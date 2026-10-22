// d0e535313898676eb605277339b50f27.cct / CEmoticons / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callMethod("regMsgList", _this, 1)
  setMeProp(_me, "m_sWindowID", "EmoticonsWnd");
  setMeProp(_me, "m_ar_EmotList", new LingoList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
  setMeProp(_me, "m_bDanceState", 0);
  setMeProp(_me, "m_bDanceBtnState", 1);
  setMeProp(_me, "m_rGrid", callNamed("createObject", callNamed("getUniqueID"), "CEmoticonGrid"));
  callNamed("registerMessage", "ui_Emoticons", callMethod("getID", _this), symbol("showHideEmoticons"))
  callNamed("registerMessage", "close_Emoticons", callMethod("getID", _this), symbol("_Close"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _this), symbol("_Close"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("_ChangeDanceState"))
  callNamed("registerMessage", "DisableDanceButton", callMethod("getID", _this), symbol("SetDanceButtonState"))
  callMethod("regMsgList", _this, 1)
  return 1;
}

