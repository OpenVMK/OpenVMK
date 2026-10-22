// vmk_furniture_code.cct / CRoomItemEntranceFeeTurnStile / createCurrentItemConfigurationDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createCurrentItemConfigurationDialog(_me: LingoMe, _this: LingoValue, i_iRef: LingoValue, a_ar_Configuration: LingoValue) {
  var t_iCost = callNamed("integer", a_ar_Configuration["fee"]);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "pay_turnstile_entrance_fee", 2);
  callMethod("show", t)
  var t_ar_btnOk = new LingoPropList([symbol("text"), "OK", symbol("eventID"), symbol("Ok"), symbol("data"), new LingoPropList([symbol("ref"), i_iRef, symbol("data"), a_ar_Configuration])]);
  var t_ar_btnCancel = new LingoPropList([symbol("text"), "CANCEL", symbol("eventID"), symbol("cancel"), symbol("data"), new LingoPropList([symbol("ref"), i_iRef, symbol("data"), a_ar_Configuration])]);
  var t_txt = callNamed("getText", "furni.conf.turnstile.fee");
  t_txt = callNamed("replaceChunks", t_txt, "$", t_iCost);
  callMethod("setText", t, t_txt, callNamed("getText", "furni.conf.turnstile.fee.required.title"), t_ar_btnCancel, t_ar_btnOk)
}

