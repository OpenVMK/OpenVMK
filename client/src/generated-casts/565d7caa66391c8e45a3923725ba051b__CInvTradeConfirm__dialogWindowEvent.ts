// 565d7caa66391c8e45a3923725ba051b.cct / CInvTradeConfirm / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialog: LingoValue, a_kEvent: LingoValue) {
  switch (a_sDialog) {
case meProp(_me, "m_sDialog"):
  switch (a_kEvent) {
case symbol("dialogOK"):
  setMeProp(_me, "m_sIgnoreConfirmDialog", lingoBinary("join", "InvIgnoreConfirm", theProperty("milliSeconds")));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), meProp(_me, "m_sIgnoreConfirmDialog"), 2, 1);
  var t_sTitle = callNamed("getText", "tra.confirm.ignore.dialog.title");
  var t_sText = callNamed("getText", "tra.confirm.ignore.dialog.text");
  var t_rBtn1 = callNamed("getText", "tra.confirm.ignore.dialog.btnCancel");
  var t_rBtn2 = callNamed("getText", "tra.confirm.ignore.dialog.btnOK");
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1, t_rBtn2)
  callMethod("show", t)
  break;
case symbol("dialogCancel"):
case "close":
  var t_iResp = 0;
  callMethod("send", callNamed("getConnection", "VMK"), "TrdResponse", new LingoPropList([symbol("int"), t_iResp, symbol("int"), meProp(_me, "m_iReqRef")]))
  callNamed("removeDialogWindow", meProp(_me, "m_sDialog"))
  callNamed("removeObject", callMethod("getID", _this))
  break;
case symbol("dialogAlternative"):
  t_iResp = 1;
  callMethod("send", callNamed("getConnection", "VMK"), "TrdResponse", new LingoPropList([symbol("int"), t_iResp, symbol("int"), meProp(_me, "m_iReqRef")]))
  callNamed("removeDialogWindow", meProp(_me, "m_sDialog"))
  callNamed("removeObject", callMethod("getID", _this))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.trading")
  break;
  break;
  }

  break;
case meProp(_me, "m_sIgnoreConfirmDialog"):
  switch (a_kEvent) {
case symbol("dialogOK"):
  t_iResp = 2;
  callMethod("send", callNamed("getConnection", "VMK"), "TrdResponse", new LingoPropList([symbol("int"), t_iResp, symbol("int"), meProp(_me, "m_iReqRef")]))
  callNamed("removeObject", callMethod("getID", _this))
  break;
case symbol("dialogCancel"):
  setMeProp(_me, "m_sDialog", lingoBinary("join", "InvTradeConfirm", theProperty("milliSeconds")));
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), meProp(_me, "m_sDialog"), 3, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, meProp(_me, "m_sDialogTxt"), callNamed("getText", "tra.confirm.title"), callNamed("getText", "tra.cancel"), callNamed("getText", "tra.refuse"), callNamed("getText", "tra.ok"))
  break;
  }

  break;
  }

}

