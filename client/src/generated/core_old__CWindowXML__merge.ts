// core.old.cct / CWindowXML / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, tLayout: LingoValue) {
  callMethod("setDeactive", _this)
  if (!lingoTruthy(callMethod("buildVisual", _this, tLayout))) {
  return 0;
  }

  callMethod("add", meProp(_me, "pSpecialIDList"), lingoBinary("join", "drag", meProp(_me, "pGroupData").count))
  callMethod("add", meProp(_me, "pSpecialIDList"), lingoBinary("join", "close", meProp(_me, "pGroupData").count))
  callMethod("Activate", meProp(_me, "pWindowMngr"), callMethod("getID", _this))
  return 1;
}

