// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / _NextStep

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _NextStep(_me: LingoMe, _this: LingoValue) {
  var t_sWndName = "RoomNameWnd";
  var t_rWindow = callNamed("getWindow", "RoomNameWnd");
  if (callMethod("elementExists", t_rWindow, "reg.roomname.input")) {
  var t_sRoomName = callMethod("getText", callMethod("getElement", t_rWindow, "reg.roomname.input"));
  if (lingoBinary("gt", t_sRoomName.length, 30)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckRoomNameLength", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "reg.roomname.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  callMethod("CheckContent", meProp(_me, "m_rRoomNameField"))
  callMethod("CheckContent", meProp(_me, "m_rRoomDescField"))
  return 0;
  }

  }

  if (callMethod("elementExists", t_rWindow, "reg.roomdescription.input")) {
  var t_sRoomDesc = callMethod("getText", callMethod("getElement", t_rWindow, "reg.roomdescription.input"));
  if (lingoBinary("and", lingoBinary("gt", t_sRoomDesc.length, 255), lingoBinary("neq", t_sRoomDesc, ""))) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckRoomNameLength", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.roomdesc.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  callMethod("CheckContent", meProp(_me, "m_rRoomNameField"))
  callMethod("CheckContent", meProp(_me, "m_rRoomDescField"))
  return 0;
  }

  }

  var i = 0;
  callMethod("setAllowEmpty", meProp(_me, "m_rRoomDescField"), 1)
  setMeProp(_me, "m_bRoomNAmeOK", callMethod("CheckContent", meProp(_me, "m_rRoomNameField")));
  setMeProp(_me, "m_bRoomDescOK", callMethod("CheckContent", meProp(_me, "m_rRoomDescField")));
  setMeProp(_me, "m_rDialogWindow", callNamed("createDialogWindow", callMethod("getID", _this), "RoomCreationError", 1, 1));
  if (meProp(_me, "m_bRoomNAmeOK")) {
  i = lingoBinary("add", i, 1);
  } else {
  var t_sTxt = callNamed("getText", "cat.check.name");
  callMethod("show", meProp(_me, "m_rDialogWindow"))
  callMethod("setText", meProp(_me, "m_rDialogWindow"), t_sTxt, "Room Creation Error", "OK")
  callMethod("CheckContent", meProp(_me, "m_rRoomNameField"))
  callMethod("CheckContent", meProp(_me, "m_rRoomDescField"))
  }

  if (meProp(_me, "m_bRoomDescOK")) {
  i = lingoBinary("add", i, 1);
  } else {
  t_sTxt = callNamed("getText", "cat.check.desc");
  callMethod("show", meProp(_me, "m_rDialogWindow"))
  callMethod("setText", meProp(_me, "m_rDialogWindow"), t_sTxt, "Room Creation Error", "OK")
  callMethod("CheckContent", meProp(_me, "m_rRoomNameField"))
  callMethod("CheckContent", meProp(_me, "m_rRoomDescField"))
  }

  if (lingoBinary("gte", i, 2)) {
  t_rWindow = callNamed("getWindow", t_sWndName);
  var t_rElementName = callMethod("getElement", t_rWindow, "reg.roomname.input");
  var t_rElementDesc = callMethod("getElement", t_rWindow, "reg.roomdescription.input");
  setMeProp(_me, "m_sRoomName", callMethod("getText", t_rElementName));
  setMeProp(_me, "m_sRoomDesc", callMethod("getText", t_rElementDesc));
  var t_sTxtName = callMethod("GetContent", meProp(_me, "m_rRoomNameField"));
  if (callNamed("stringp", t_sTxtName)) {
  t_sTxtName = callNamed("ParseCannedText", t_sTxtName);
  }

  var t_arName = callMethod("GetContent", meProp(_me, "m_rRoomNameField"));
  var t_iNameCount = t_sTxtName.count;
  var tCannedBlock = callNamed("TransformCannedToMsg", t_sTxtName);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", meProp(_me, "m_mp_DataToServer"), tKey, tvalue)
  }

  var t_sTxtDesc = callMethod("GetContent", meProp(_me, "m_rRoomDescField"));
  if (callNamed("stringp", t_sTxtDesc)) {
  t_sTxtDesc = callNamed("ParseCannedText", t_sTxtDesc);
  }

  t_sTxtDesc = callMethod("GetContent", meProp(_me, "m_rRoomDescField"));
  var t_iDescCount = t_sTxtDesc.count;
  var tCannedBlock2 = callNamed("TransformCannedToMsg", t_sTxtDesc);
  for (var i = 1; i <= tCannedBlock2.count; ++i) {
  var tKey2 = callMethod("getPropAt", tCannedBlock2, i);
  var tValue2 = tCannedBlock2[i];
  callMethod("addProp", meProp(_me, "m_mp_DataToServer"), tKey2, tValue2)
  }

  callMethod("close", t_rWindow)
  if (callNamed("windowExists", "MessageBar")) {
  if (callMethod("elementExists", callNamed("getWindow", "MessageBar"), "chat.field")) {
  }

  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "BUY_ROOM", meProp(_me, "m_mp_DataToServer"))
  }

}

