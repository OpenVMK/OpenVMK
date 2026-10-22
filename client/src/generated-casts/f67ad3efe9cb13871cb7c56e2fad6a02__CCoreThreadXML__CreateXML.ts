// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreThreadXML / CreateXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateXML(_me: LingoMe, _this: LingoValue, a_sDoc: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rXMLObjSrc"))) {
  callMethod("construct", _this)
  }

  var t_rXML = callMethod("rawNew", meProp(_me, "m_rXMLObjSrc").script);
  callMethod("close", t_rXML)
  setThePropOf(t_rXML, "m_rPrs", meProp(_me, "m_rXMLParser"));
  if (callNamed("stringp", a_sDoc)) {
  callMethod("open", t_rXML, a_sDoc)
  }

  return t_rXML;
}

