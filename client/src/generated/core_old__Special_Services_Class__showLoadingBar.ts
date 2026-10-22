// core.old.cct / Special Services Class / showLoadingBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showLoadingBar(_me: LingoMe, tLoadID: LingoValue, tProps: LingoValue) {
  var tObj = callNamed("createObject", symbol("random"), callNamed("GetClsVariable", "loading.bar.class"));
  if (!lingoTruthy(callMethod("Define", tObj, tLoadID, tProps))) {
  callNamed("removeObject", callMethod("getID", tObj))
  return callNamed("error", _me, "Couldn't initialize loading bar instance!", symbol("showLoadingBar"));
  }

  return callMethod("getID", tObj);
}

