// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / RemoveCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveCamera(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_camera"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_camera")))
  }

  setMeProp(_me, "m_camera", undefined);
}

