// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / getValue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getValue(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_rRef").value;
}

