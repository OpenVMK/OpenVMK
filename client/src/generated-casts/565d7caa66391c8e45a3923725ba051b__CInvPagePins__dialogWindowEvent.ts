// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_data: LingoValue) {
  switch (t_dialogName) {
case "pins.combine.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("send", callNamed("getConnection", "VMK"), "CombinePin", t_data)
  break;
case symbol("dialogCancel"):
  break;
  }

  for (var t_rPin of meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].toArray()) {
  callMethod("setaProp", t_rPin, symbol("state"), symbol("normal"))
  }

  callMethod("_ActivateWornPinWindow", _this, 1)
  setMeProp(_me, "m_kMode", symbol("select"));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

