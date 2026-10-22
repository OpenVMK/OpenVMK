// vmk_hm_minigame.cct / CHMPlayerStatus / setStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setStatus(_me: LingoMe, i_iStatus: LingoValue, i_iTime: LingoValue) {
  setMeProp(_me, "m_iStatus", i_iStatus);
  switch (meProp(_me, "m_iStatus")) {
case symbol("possessed"):
  setMeProp(_me, "m_iPossessStartTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_iBarTime", float(10000));
  break;
case symbol("delayed"):
  setMeProp(_me, "m_iDelayedStartTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_iBarTime", float(5000));
  break;
  }

  if ((lingoTruthy(callNamed("voidp", i_iTime)) ? 0 : 1)) {
  setMeProp(_me, "m_iBarTime", i_iTime);
  }

}

