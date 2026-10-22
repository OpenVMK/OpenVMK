// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / getAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAt(_me: LingoMe, _this: LingoValue, a_vIndex: LingoValue) {
  if (callNamed("integerp", a_vIndex)) {
  return meProp(_me, "m_rRef").child[a_vIndex];
  } else {
  if (callMethod("Search", _this, "type", a_vIndex)) {
  return meProp(_me, "m_rRef");
  } else {
  return callMethod("duplicate", meProp(_me, "m_rNull"));
  }

  }

}

