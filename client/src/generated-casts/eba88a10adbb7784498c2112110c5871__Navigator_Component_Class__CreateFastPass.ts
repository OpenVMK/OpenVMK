// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / CreateFastPass

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateFastPass(_me: LingoMe, a_mp_FastPassData: LingoValue) {
  if ((lingoTruthy(callNamed("objectExists", "FastPassWindow")) ? 0 : 1)) {
  setMeProp(_me, "m_obj_FastPassWindow", callNamed("createObject", "FastPassWindow", "CNavigatorFastPassWindow"));
  }

  callMethod("CreateFastPassWindow", meProp(_me, "m_obj_FastPassWindow"))
  callMethod("SetFastPassData", meProp(_me, "m_obj_FastPassWindow"), a_mp_FastPassData)
}

