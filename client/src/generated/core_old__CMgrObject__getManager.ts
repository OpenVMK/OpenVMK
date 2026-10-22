// core.old.cct / CMgrObject / getManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (!lingoTruthy(callMethod("getOne", meProp(_me, "pManagerList"), tID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Manager not found:", tID), symbol("getManager"));
  }

  return meProp(_me, "pObjectList")[tID];
}

