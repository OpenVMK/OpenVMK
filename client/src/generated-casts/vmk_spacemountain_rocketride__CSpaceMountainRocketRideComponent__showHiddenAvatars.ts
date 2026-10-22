// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / showHiddenAvatars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHiddenAvatars(_me: LingoMe) {
  for (var t_rAvatar of meProp(_me, "m_ar_hiddenAvatars").toArray()) {
  callMethod("visible", callMethod("GetVisual", t_rAvatar), 1, 1)
  }

  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
}

