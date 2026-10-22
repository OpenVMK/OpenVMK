// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / GetObjByKey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetObjByKey(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_sKey_rObj"), a_sKey);
}

