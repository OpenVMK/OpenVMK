// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / updateMute

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMute(_me: LingoMe, t_iTime: LingoValue) {
  if (lingoBinary("gt", t_iTime, 0)) {
  callMethod("setText", _me, lingoBinary("joinPad", lingoBinary("joinPad", "You're typing text too fast, continue in", t_iTime), "seconds."))
  t_iTime = lingoBinary("sub", t_iTime, 1);
  callNamed("createTimeout", lingoBinary("join", symbol("executeOnce"), theProperty("milliSeconds")), 1000, symbol("updateMute"), callMethod("getID", _me), t_iTime, 1)
  } else {
  callMethod("setText", _me, "")
  callMethod("setEditable", _me, 1)
  }

}

