// vmk_domestic.cct /  / SetObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetObject(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  callNamed("callAncestor", symbol("SetObject"), _this, a_rObj)
  setMeProp(_me, "m_veLastAbs", callMethod("GetAbsPos", a_rObj));
}

