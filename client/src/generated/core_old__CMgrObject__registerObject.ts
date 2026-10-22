// core.old.cct / CMgrObject / registerObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerObject(_me: LingoMe, _this: LingoValue, tID: LingoValue, tObject: LingoValue) {
  if (!lingoTruthy(callNamed("objectp", tObject))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Invalid object:", tObject), symbol("register"));
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pObjectList")[tID]))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Object already exists:", tID), symbol("register"));
  }

  if (callNamed("voidp", callMethod("getID", tObject))) {
  callMethod("setID", tObject, tID)
  }

  meProp(_me, "pObjectList")[tID] = tObject;
  callMethod("append", meProp(_me, "pInstanceList"), tID)
  return 1;
}

