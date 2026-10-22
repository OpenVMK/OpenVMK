// registration.cct / CRegPage3 / SendData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendData(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bWaitForAnswer")) {
  return 1;
  }

  setMeProp(_me, "m_bWaitForAnswer", 1);
  callNamed("createTimeout", symbol("waitForAnswer"), 2000, symbol("_sendDelayEnded"), callMethod("getID", _this), undefined, 1)
  callMethod("send", callNamed("getConnection", "VMK"), "AcceptEULA")
  return 1;
}

