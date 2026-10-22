// vmk_hm_minigame.cct / CHMDoor / activateVortex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateVortex(_me: LingoMe, a_iType: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_rVortex"), callNamed("sprite", 0))) {
  setThePropOf(meProp(_me, "m_rVortex"), "blend", 80);
  switch (a_iType) {
case 1:
  setThePropOf(meProp(_me, "m_rVortex"), "color", callNamed("rgb", "#40FF31"));
  break;
case 2:
  setThePropOf(meProp(_me, "m_rVortex"), "color", callNamed("rgb", "#FF5AB7"));
  break;
  default:
  setThePropOf(meProp(_me, "m_rVortex"), "color", callNamed("rgb", "#000000"));
  }

  }

}

