// 38365562899c7799eeaea4a99041ea57.cct / CStructStack / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe) {
  var t_s = "[";
  for (var i = 1; i <= meProp(_me, "m_ar_data").count; ++i) {
  var t_rdata = meProp(_me, "m_ar_data")[i];
  t_s = t_s + t_rdata;
  if (lingoBinary("neq", i, meProp(_me, "m_ar_data").count)) {
  t_s = t_s + ", ";
  }

  }

  t_s = t_s + "]";
  return t_s;
}

