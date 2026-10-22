// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / GetRoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRoot(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rRef", meProp(_me, "m_rRoot"));
  return meProp(_me, "m_rRoot");
}

