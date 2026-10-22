// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  for (var t_rAvatar of meProp(_me, "m_ar_hiddenAvatars").toArray()) {
  if (callNamed("objectp", t_rAvatar)) {
  if (callNamed("objectp", callMethod("GetVisual", t_rAvatar))) {
  callMethod("visible", callMethod("GetVisual", t_rAvatar), 0, 0)
  }

  }

  }

}

