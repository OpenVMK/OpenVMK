// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreThreadXML / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callMethod("close", meProp(_me, "m_rXMLObjSrc"))
  setMeProp(_me, "m_rXMLObjSrc", undefined);
  callNamed("removeObject", "core.xml.parser")
  setMeProp(_me, "m_rXMLParser", undefined);
  return 1;
}

