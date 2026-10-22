// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iSourceKey", 0);
  setMeProp(_me, "m_rTagDefMap", undefined);
  setMeProp(_me, "m_mp_sKey_rObj", new LingoPropList([]));
  return 1;
}

