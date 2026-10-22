// vmk_junglecruise_minigame.cct / CJungleCruiseFactorBoat / GoDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GoDown(_me: LingoMe) {
  var tThrottle = callMethod("GetParam", callMethod("getObject", _me), "Throttle");
  tThrottle = lingoBinary("sub", tThrottle, meProp(_me, "m_fBrakeAmount"));
  if (lingoBinary("lte", tThrottle, -float(meProp(_me, "m_fBrakeLimit")))) {
  tThrottle = -float(meProp(_me, "m_fBrakeLimit"));
  } else {
  var tdata = new LingoList([1]);
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, tdata)
  }

  callMethod("SetParam", callMethod("getObject", _me), "Throttle", tThrottle)
}

