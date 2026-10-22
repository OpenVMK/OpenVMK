// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / GetChild

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetChild(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var t_rNode = callMethod("getaProp", meProp(_me, "m_rRef").child, a_sID);
  if (callNamed("voidp", t_rNode)) {
  return callMethod("duplicate", meProp(_me, "m_rNull"));
  } else {
  return t_rNode;
  }

}

