// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function remove(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  var t_rObj = callMethod("getaProp", meProp(_me, "m_rChilds"), a_sKey);
  if (callNamed("voidp", t_rObj)) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Object with given key not found:", "\""), a_sKey), "\""), symbol("remove"));
  }

  callMethod("_ClearObj", meProp(_me, "m_rFactory"), t_rObj)
  callMethod("deleteProp", meProp(_me, "m_rChilds"), a_sKey)
  return 1;
}

