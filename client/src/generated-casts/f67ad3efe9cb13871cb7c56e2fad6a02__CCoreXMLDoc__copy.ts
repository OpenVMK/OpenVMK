// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / copy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function copy(_me: LingoMe, _this: LingoValue, a_rXML: LingoValue) {
  if (callNamed("listp", a_rXML)) {
  var t_rSrc = a_rXML;
  } else {
  t_rSrc = callMethod("GetNode", a_rXML);
  }

  callMethod("addProp", meProp(_me, "m_rRef").child, callMethod("getaProp", t_rSrc.param, "ID"), callMethod("duplicate", t_rSrc))
}

