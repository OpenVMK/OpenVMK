// vmk_jungle_cruise.cct / CTutorial / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTime = lingoBinary("sub", lingoBinary("div", theProperty("milliSeconds"), float(1000)), meProp(_me, "m_fInitTime"));
  var tDt = lingoBinary("sub", tTime, meProp(_me, "m_fLastTime"));
  setMeProp(_me, "m_fLastTime", tTime);
  for (var tLine of meProp(_me, "m_mp_sequence").toArray()) {
  if (lingoBinary("and", lingoBinary("lt", meProp(_me, "m_fLastTime"), tLine.time), lingoBinary("gte", lingoBinary("add", meProp(_me, "m_fLastTime"), tDt), tLine.time))) {
  setMeProp(_me, "m_mp_sayBuffer", tLine.speak);
  }

  }

}

