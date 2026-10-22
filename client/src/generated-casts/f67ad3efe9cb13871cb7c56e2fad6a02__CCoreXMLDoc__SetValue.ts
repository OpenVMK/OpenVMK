// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / SetValue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetValue(_me: LingoMe, _this: LingoValue, a_sValue: LingoValue) {
  setThePropOf(meProp(_me, "m_rRef"), "value", a_sValue);
}

