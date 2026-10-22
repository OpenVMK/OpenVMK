// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / hideSittingAvatars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideSittingAvatars(_me: LingoMe) {
  var t_ar_tiles = callNamed("GetTilesOnFloor", "rocket");
  setMeProp(_me, "m_ar_hiddenAvatars", callNamed("GetAvatarsOnTiles", t_ar_tiles));
  for (var t_rAvatar of meProp(_me, "m_ar_hiddenAvatars").toArray()) {
  callMethod("visible", callMethod("GetVisual", t_rAvatar), 0, 0)
  }

}

