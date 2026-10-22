// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / disableCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function disableCamera(_me: LingoMe) {
  callMethod("inActivate", meProp(_me, "m_camera"))
  for (var tHideable of callMethod("GetHideables", meProp(_me, "m_camera")).toArray()) {
  setThePropOf(callNamed("sprite", tHideable), "visible", 0);
  }

}

