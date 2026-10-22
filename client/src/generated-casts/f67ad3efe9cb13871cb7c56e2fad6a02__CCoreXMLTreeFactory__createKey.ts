// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / createKey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createKey(_me: LingoMe, _this: LingoValue) {
  var t_sUniqueKey = lingoBinary("join", "#", meProp(_me, "m_iSourceKey"));
  setMeProp(_me, "m_iSourceKey", lingoBinary("add", meProp(_me, "m_iSourceKey"), 1));
  return t_sUniqueKey;
}

