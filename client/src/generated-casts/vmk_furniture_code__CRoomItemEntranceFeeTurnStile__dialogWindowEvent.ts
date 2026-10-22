// vmk_furniture_code.cct / CRoomItemEntranceFeeTurnStile / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rdata: LingoValue) {
  var t_iRef = meProp(_me, "m_iRef");
  var t_iFee = 0;
  switch (t_dialogName) {
case "pay_turnstile_entrance_fee":
  if (callNamed("listp", t_rdata)) {
  t_iRef = t_rdata[symbol("ref")];
  var a_ar_Configuration = t_rdata[symbol("data")];
  t_iFee = callNamed("string", a_ar_Configuration["fee"]);
  }

  switch (t_dialogEvent) {
case symbol("Ok"):
  callNamed("executeMessage", "PlayFxSound", "VMK-payentrance-1")
  callMethod("send", callNamed("getConnection", "VMK"), "UseItemConfiguration", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 1, symbol("int"), 1, symbol("str"), "fee", symbol("str"), t_iFee]))
  break;
case symbol("cancel"):
  callMethod("send", callNamed("getConnection", "VMK"), "UseItemConfiguration", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0, symbol("int"), 1, symbol("str"), "fee", symbol("str"), t_iFee]))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.turnstile", 1)
  break;
  }

  break;
case "configure_entrance_fee_turnstile":
  if (callNamed("listp", t_rdata)) {
  t_iRef = t_rdata[symbol("ref")];
  a_ar_Configuration = t_rdata[symbol("data")];
  t_iFee = callNamed("string", a_ar_Configuration["fee"]);
  }

  switch (t_dialogEvent) {
case symbol("zeroCredits"):
case symbol("oneCredit"):
case symbol("threeCredits"):
case symbol("fiveCredits"):
  callMethod("send", callNamed("getConnection", "VMK"), "ConfigureItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 1, symbol("str"), "fee", symbol("str"), t_iFee]))
  break;
case symbol("Ok"):
  break;
case symbol("cancel"):
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.turnstile", 1)
  break;
  break;
  break;
  break;
  }

  break;
case "collect_turnstile_credits":
  switch (t_dialogEvent) {
case symbol("Ok"):
  break;
case symbol("cancel"):
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.turnstile", 1)
  break;
  }

  break;
  }

  callNamed("removeDialogWindow", t_dialogName)
}

