// vmk_hm_minigame.cct / CHMDoor / openDoor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openDoor(_me: LingoMe) {
  for (var tSprite of meProp(_me, "m_rSprites").toArray()) {
  if (lingoBinary("neq", tSprite, callNamed("sprite", 0))) {
  setThePropOf(tSprite, "visible", 0);
  }

  }

  if (lingoBinary("neq", meProp(_me, "m_rVortex"), callNamed("sprite", 0))) {
  setThePropOf(meProp(_me, "m_rVortex"), "visible", 1);
  }

  setMeProp(_me, "m_iState", symbol("animating"));
}

