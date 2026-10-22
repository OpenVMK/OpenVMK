// vmk_pirates_minigame.cct / CWhirlpoolFactor / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  setMeProp(_me, "m_ar_shipsCaught", new LingoList([]));
  setMeProp(_me, "m_a3_whirl", callNamed("value", callNamed("getMember", "wp30x30").text));
  setMeProp(_me, "m_speed", undefined);
  setMeProp(_me, "m_pullradius", undefined);
  setMeProp(_me, "m_pullamount", undefined);
  setMeProp(_me, "m_spinspeed", undefined);
  setMeProp(_me, "m_releaseradius", undefined);
  return 1;
}

