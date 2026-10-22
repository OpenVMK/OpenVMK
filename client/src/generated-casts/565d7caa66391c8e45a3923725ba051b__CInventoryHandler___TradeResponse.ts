// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _TradeResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeResponse(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iUserRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iResponse = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iResponse, 1)) {
  var t_rTrader = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), t_iUserRef, "avatar");
  var t_iTraderGender = callMethod("GetParam", t_rTrader, "SEX");
  var t_sOwnName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  var t_info = new LingoPropList([]);
  callNamed("executeMessage", symbol("avatarsex"), t_sOwnName, t_info)
  var t_sTraderName = "";
  if (callNamed("objectp", t_rTrader)) {
  t_sTraderName = callMethod("GetParam", t_rTrader, "NAME");
  }

  callMethod("TradeOpen", _this.component, t_iUserRef, lingoBinary("neq", t_iTraderGender, t_info["SEX"]))
  if (lingoBinary("neq", t_iTraderGender, callMethod("getaProp", t_info, "SEX"))) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "trade.dialog.oppositeGender", 1, 1);
  var t_ar_CustomBtn = new LingoPropList([symbol("text"), callNamed("getText", "inv.trade.oppositeGender.dialog.OK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), t_iUserRef]);
  callMethod("setText", t, callNamed("getText", "inv.trade.oppositeGender.dialog.text"), callNamed("getText", "inv.trade.oppositeGender.dialog.title"), t_ar_CustomBtn)
  callMethod("show", t)
  }

  } else {
  if (lingoBinary("eq", t_iResponse, 0)) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "trade.dialog.trade.declined", 1, 1);
  t_ar_CustomBtn = new LingoPropList([symbol("text"), callNamed("getText", "inv.trade.declined.dialog.OK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), t_sTraderName]);
  callMethod("setText", t, callNamed("getText", "inv.trade.declined.dialog.text"), callNamed("getText", "inv.trade.declined.dialog.title"), t_ar_CustomBtn)
  callMethod("show", t)
  }

  }

}

