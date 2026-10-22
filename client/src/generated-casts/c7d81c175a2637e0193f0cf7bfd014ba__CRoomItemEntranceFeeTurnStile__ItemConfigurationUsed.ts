// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemEntranceFeeTurnStile / ItemConfigurationUsed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ItemConfigurationUsed(_me: LingoMe, _this: LingoValue, t_iRef: LingoValue, t_iStatus: LingoValue, a_ar_Params: LingoValue) {
  if (lingoBinary("eq", t_iRef, meProp(_me, "m_iRef"))) {
  switch (t_iStatus) {
case 2:
  callNamed("removeDialogWindow", "pay_turnstile_entrance_fee")
  break;
case 3:
  var t_iCollected = callNamed("integer", a_ar_Params["collected"]);
  var t_iCredits = callNamed("integer", a_ar_Params["credits"]);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "collect_turnstile_credits", 1, 1);
  callMethod("show", t)
  var t_ar_btnOk = new LingoPropList([symbol("text"), "OK", symbol("eventID"), symbol("Ok"), symbol("data"), new LingoPropList([symbol("ref"), meProp(_me, "m_iRef"), symbol("data"), a_ar_Params])]);
  var t_txt = callNamed("getText", "furni.conf.turnstile.collected.credits");
  t_txt = callNamed("replaceChunks", t_txt, "$", t_iCollected);
  callMethod("setText", t, t_txt, callNamed("getText", "furni.conf.turnstile.collected.title"), "OK")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown configuration status", t_iStatus))
  }

  setMeProp(_me, "m_iRef", t_iRef);
  }

}

