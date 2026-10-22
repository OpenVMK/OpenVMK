// core.old.cct / CBigInt16 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_iValue", new LingoList([]));
  setMeProp(_me, "m_iLength", 0);
  setMeProp(_me, "m_iBitsPerWord", 12);
  setMeProp(_me, "m_iBitMask", 1);
  for (var i = 1; i <= meProp(_me, "m_iBitsPerWord"); ++i) {
  setMeProp(_me, "m_iBitMask", callNamed("bitOr", lingoBinary("mul", meProp(_me, "m_iBitMask"), 2), 1));
  }

  setMeProp(_me, "m_iCarryMask", callNamed("bitOr", lingoBinary("mul", meProp(_me, "m_iBitMask"), 2), 1));
  return 1;
}

