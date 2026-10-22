// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  callMethod("regMsgList", _this, 0)
  callNamed("unregisterMessage", symbol("dictionary_ready"), callMethod("getID", _this))
  callNamed("unregisterMessage", symbol("furnimap_ready"), callMethod("getID", _this))
  callNamed("removeConnection", t_sID)
  return 1;
}

