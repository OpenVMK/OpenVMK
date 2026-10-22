// vmk_tutorial.cct / CJungleCruiseInterface / enableCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enableCamera(_me: LingoMe) {
  callNamed("put", "enable camera")
  callMethod("Activate", meProp(_me, "m_camera"))
  for (var tHideable of callMethod("GetHideables", meProp(_me, "m_camera")).toArray()) {
  setThePropOf(callNamed("sprite", tHideable), "visible", 1);
  }

}

