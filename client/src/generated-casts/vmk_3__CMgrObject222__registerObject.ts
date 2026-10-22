// vmk_3.dcr / CMgrObject222 / registerObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerObject(_me: LingoMe, _this: LingoValue, tID: LingoValue, tObject: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", tObject)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", "Invalid object:", tObject), symbol("register"));
  }

  if ((lingoTruthy(callNamed("voidp", _this.pObjectList[tID])) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", "Object already exists:", tID), symbol("register"));
  }

  if (callNamed("voidp", callNamed("getID", tObject))) {
  callNamed("setID", tObject, tID)
  _this.pObjectList[tID] = tObject;
  callNamed("append", _this.pInstanceList, tID)
  return 1;
  }

}

