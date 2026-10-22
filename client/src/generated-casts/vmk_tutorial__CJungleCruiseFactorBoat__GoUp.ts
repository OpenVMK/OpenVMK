// vmk_tutorial.cct / CJungleCruiseFactorBoat / GoUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GoUp(_me: LingoMe) {
  var tThrottle = callMethod("GetParam", callMethod("getObject", _me), "Throttle");
  tThrottle = lingoBinary("add", tThrottle, meProp(_me, "m_fAccelAmount"));
  if (lingoBinary("gte", tThrottle, meProp(_me, "m_fAccelLimit"))) {
  tThrottle = meProp(_me, "m_fAccelLimit");
  } else {
  var tdata = new LingoList([3]);
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, tdata)
  }

  callMethod("SetParam", callMethod("getObject", _me), "Throttle", tThrottle)
}

