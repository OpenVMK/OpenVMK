// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / _BuyRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _BuyRoom(_me: LingoMe, _this: LingoValue) {
  var t_iPrice = meProp(_me, "m_mpRooms")[1][meProp(_me, "m_iRoomNum")].price;
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iBalance"), t_iPrice), 0)) {
  setMeProp(_me, "m_bEnoughCredits", 1);
  } else {
  setMeProp(_me, "m_bEnoughCredits", 0);
  }

  if (lingoBinary("eq", meProp(_me, "m_bEnoughCredits"), 0)) {
  var t_rDialogWnd = callNamed("createDialogWindow", callMethod("getID", _this), "NotEnoughCredits", 1, 1);
  callMethod("show", t_rDialogWnd)
  var t_sMsg = callNamed("getText", "cat.not.enough.credits");
  callMethod("setText", t_rDialogWnd, t_sMsg, callNamed("getText", "cat.not.enough.credits.hd"), "OK")
  return 1;
  }

  setMeProp(_me, "m_mp_DataToServer", new LingoPropList([]));
  var t_ID = meProp(_me, "m_mpRooms")[1][meProp(_me, "m_iRoomNum")].code;
  var t_CatID = callNamed("value", callMethod("getPropAt", meProp(_me, "m_mpRooms"), 1));
  callMethod("addProp", meProp(_me, "m_mp_DataToServer"), symbol("int"), t_ID)
  callMethod("addProp", meProp(_me, "m_mp_DataToServer"), symbol("int"), t_CatID)
  callMethod("CreateRoomNameWindow", _this)
}

