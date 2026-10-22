// vmk_casual.cct / CCasualGameChallengeInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogName, meProp(_me, "m_sDialogName"))) {
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("send", callNamed("getConnection", "VMK"), 951, new LingoPropList([symbol("integer"), meProp(_me, "m_iGameID"), symbol("integer"), meProp(_me, "m_iChallengerRef")]))
  break;
case symbol("dialogCancel"):
  break;
  }

  callNamed("removeObject", callMethod("getID", _this))
  }

}

