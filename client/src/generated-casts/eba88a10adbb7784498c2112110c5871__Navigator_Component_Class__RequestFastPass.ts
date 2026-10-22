// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / RequestFastPass

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestFastPass(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectExists", "FastPassWindow")) ? 0 : 1)) {
  setMeProp(_me, "m_obj_FastPassWindow", callNamed("createObject", "FastPassWindow", "CNavigatorFastPassWindow"));
  callMethod("CreateFastPassWindow", meProp(_me, "m_obj_FastPassWindow"))
  }

}

