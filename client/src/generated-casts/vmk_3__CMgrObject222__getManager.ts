// vmk_3.dcr / CMgrObject222 / getManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if ((lingoTruthy(callNamed("getOne", _this.pManagerList, tID)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", "Manager not found:", tID), symbol("getManager"));
  }

  return _this.pObjectList[tID];
}

