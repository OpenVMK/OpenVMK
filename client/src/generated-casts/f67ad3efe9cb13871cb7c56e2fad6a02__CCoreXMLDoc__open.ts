// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, _this: LingoValue, a_sXML: LingoValue) {
  callNamed("try")
  setMeProp(_me, "m_rRoot", callMethod("ParseXML", meProp(_me, "m_rPrs"), "", a_sXML));
  if (callNamed("catch", "Invalid document string")) {
  callMethod("close", _this)
  return callNamed("error", _this, "Given XML document is invalid!", symbol("open"));
  } else {
  setMeProp(_me, "m_rRef", meProp(_me, "m_rRoot"));
  return 1;
  }

}

