// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  switch (a_sElm) {
case "avatarinfo.report.button":
  callNamed("executeMessage", symbol("call_for_help_report"), callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME"))
  break;
case "avatarinfo.kick.button":
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  var t_sTxt = callNamed("getText", "avatarinfo.kick.confirm");
  t_sTxt = callNamed("replaceChunks", t_sTxt, "\\$", callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME"));
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "RoomProfileKickUser", 2, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, t_sTxt, callNamed("getText", "avatarinfo.kick.title"), "CANCEL", "OK")
  }

  break;
case "avatarinfo.trade.button":
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "TrdSendRequest", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  }

  break;
case "avatarinfo.ignore.button":
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  t_sTxt = callNamed("getText", "avatarinfo.ignore.confirm");
  t_sTxt = callNamed("replaceChunks", t_sTxt, "\\$", callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME"));
  t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "RoomProfileIgnoreUser", 2, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, t_sTxt, callNamed("getText", "avatarinfo.ignore.title"), "CANCEL", "OK")
  }

  break;
case "avatarinfo.askfriendship.button":
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  t_sTxt = callNamed("getText", "avatarinfo.askfriend.confirm");
  t_sTxt = callNamed("replaceChunks", t_sTxt, "\\$", callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME"));
  t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "RoomProfileAskFriend", 2, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, t_sTxt, callNamed("getText", "avatarinfo.askfriend.title"), "CANCEL", "OK")
  }

  break;
case "avatarinfo.userspinlist":
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.friends")
  break;
case "close":
  setMeProp(_me, "m_rSelected", undefined);
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  callMethod("hide", meProp(_me, "m_rControls"))
  }

  break;
case "avatarinfo.pins":
  callMethod("ShowPinInfo", _this, a_vPrm)
  break;
  default:
  if (lingoBinary("starts", a_sElm, "avatarinfo.icon")) {
  var t_sIcon = callMethod("GetParam", meProp(_me, "m_rSelected"), lingoBinary("join", "icon.type.", lastChunk(a_sElm, "char")));
  if (callNamed("voidp", t_sIcon)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), "")
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), callNamed("getText", lingoBinary("join", "icon.", t_sIcon)))
  }

  }

  }

}

