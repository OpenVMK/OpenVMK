// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / GetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParam(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  var t_sValue = callMethod("getaProp", meProp(_me, "m_rRef").param, a_sKey);
  if (callNamed("voidp", t_sValue)) {
  return "";
  } else {
  return t_sValue;
  }

}

