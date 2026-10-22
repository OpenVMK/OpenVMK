// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / Search

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Search(_me: LingoMe, _this: LingoValue, a_sCritery: LingoValue, a_sValue: LingoValue) {
  if (lingoBinary("eq", callMethod("getaProp", meProp(_me, "m_rParams"), a_sCritery), a_sValue)) {
  return _this;
  } else {
  for (var t_rChild of meProp(_me, "m_rChilds").toArray()) {
  var t_rResult = callMethod("Search", t_rChild, a_sCritery, a_sValue);
  if (callNamed("objectp", t_rResult)) {
  break;
  }

  }

  }

  return t_rResult;
}

