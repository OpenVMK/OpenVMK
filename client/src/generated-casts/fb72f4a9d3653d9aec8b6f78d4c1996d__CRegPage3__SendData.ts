// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage3 / SendData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

