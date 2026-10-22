// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreThreadXML / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rXMLObjSrc", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "core.xml.doc")));
  callMethod("setaProp", meProp(_me, "m_rXMLObjSrc"), symbol("ancestor"), undefined)
  setMeProp(_me, "m_rXMLParser", callNamed("createObject", "core.xml.parser", callNamed("GetClsVariable", "core.xml.parser")));
  return 1;
}

