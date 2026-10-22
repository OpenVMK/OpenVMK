// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / Setkey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Setkey(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_sKey"), "")) {
  callNamed("error", _this, "Attempted to reset node key!", symbol("Setkey"))
  } else {
  setMeProp(_me, "m_sKey", a_sKey);
  }

}

