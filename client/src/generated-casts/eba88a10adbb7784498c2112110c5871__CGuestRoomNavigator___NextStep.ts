// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / _NextStep

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _NextStep(_me: LingoMe, _this: LingoValue) {
  var t_error = 0;
  var t_sWndName = "RoomNameWnd";
  var m_bRoomNAmeOK = callMethod("CheckContent", meProp(_me, "m_rRoomNameField"));
  var m_bRoomDescOK = callMethod("CheckContent", meProp(_me, "m_rRoomDescField"));
  var m_rDialogWindow = callNamed("createDialogWindow", callMethod("getID", _this), "RoomCreationError", 1, 1);
  if ((lingoTruthy(m_bRoomNAmeOK) ? 0 : 1)) {
  var t_sTxt = callNamed("getText", "cat.check.name");
  callMethod("show", m_rDialogWindow)
  callMethod("setText", m_rDialogWindow, t_sTxt, "Room Creation Error", "OK")
  }

  if ((lingoTruthy(m_bRoomDescOK) ? 0 : 1)) {
  t_sTxt = callNamed("getText", "cat.check.desc");
  callMethod("show", m_rDialogWindow)
  callMethod("setText", m_rDialogWindow, t_sTxt, "Room Creation Error", "OK")
  }

  if (lingoBinary("and", m_bRoomNAmeOK, m_bRoomDescOK)) {
  var t_rWindow = callNamed("getWindow", t_sWndName);
  var t_rElementName = callMethod("getElement", t_rWindow, "reg.roomname.input");
  var t_rElementDesc = callMethod("getElement", t_rWindow, "reg.roomdescription.input");
  setMeProp(_me, "m_sRoomName", callMethod("getText", t_rElementName));
  setMeProp(_me, "m_sRoomDesc", callMethod("getText", t_rElementDesc));
  var t_RoomNameCanned = callMethod("GetContent", meProp(_me, "m_rRoomNameField"));
  var t_RoomDescCanned = callMethod("GetContent", meProp(_me, "m_rRoomDescField"));
  callMethod("SendEditRoomInfo", _this, t_RoomNameCanned, t_RoomDescCanned)
  callMethod("close", t_rWindow)
  }

  callMethod("GetContent", _this)
}

