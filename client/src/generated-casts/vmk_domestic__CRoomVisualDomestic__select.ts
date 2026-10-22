// vmk_domestic.cct / CRoomVisualDomestic / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (callNamed("doubleClick")) {
  callMethod("send", callNamed("getObject", symbol("VMK")), "CLICKPET", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "REF"))]))
  return 1;
  }

}

