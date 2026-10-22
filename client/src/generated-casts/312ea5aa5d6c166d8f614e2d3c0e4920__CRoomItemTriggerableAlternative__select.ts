// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemTriggerableAlternative / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (theProperty("doubleClick")) {
  var t_iRef = callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  }

}

