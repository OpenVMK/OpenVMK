// vmk_furniture_code.cct / CRoomItemEntranceFeeTurnStile / CloseWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseWindows(_me: LingoMe, _this: LingoValue) {
  var t_sID = "vmk_turnstile_price";
  if (lingoBinary("neq", callNamed("getWindow", t_sID), 0)) {
  callNamed("removeWindow", t_sID)
  }

  callNamed("removeDialogWindow", "pay_turnstile_entrance_fee")
  callNamed("removeDialogWindow", "configure_entrance_fee_turnstile")
  callNamed("removeDialogWindow", "collect_turnstile_credits")
}

