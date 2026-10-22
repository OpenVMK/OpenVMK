// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_data: LingoValue) {
  switch (t_dialogName) {
case "tra.confirm.stop.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), -float(1)]))
  break;
case symbol("dialogCancel"):
  break;
  }

  break;
case "trade.dialog.empty.trade":
  switch (t_dialogEvent) {
case symbol("dialogCancel"):
  break;
case symbol("dialogOK"):
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 1]))
  var t_rChkBox = callNamed("getMember", lingoBinary("join", "button.checkbox.", 1));
  if (callNamed("ilk", t_rChkBox, symbol("member"))) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.youaccept"), t_rChkBox.image)
  }

  break;
  }

  break;
case "TradeNonTradeable":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  if (callNamed("listp", t_data)) {
  callMethod("send", callNamed("getConnection", "VMK"), 587, t_data)
  }

  break;
case symbol("dialogCancel"):
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

