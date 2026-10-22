// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iSourceKey", lingoBinary("div", theProperty("milliSeconds"), 4));
  setMeProp(_me, "m_rTagDefMap", new LingoPropList([]));
  setMeProp(_me, "m_mp_sKey_rObj", new LingoPropList([]));
  setThePropOf(_this, "m_rFactory", _this);
  setThePropOf(_this, "m_sType", "factory");
  return 1;
}

