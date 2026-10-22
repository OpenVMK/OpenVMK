// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / SetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParam(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue, a_sValue: LingoValue) {
  callMethod("setaProp", meProp(_me, "m_rParams"), a_sKey, a_sValue)
}

