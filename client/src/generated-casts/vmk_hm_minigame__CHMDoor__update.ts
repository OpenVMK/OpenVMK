// vmk_hm_minigame.cct / CHMDoor / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iState"), symbol("animating"))) {
  if (lingoBinary("neq", meProp(_me, "m_rVortex"), callNamed("sprite", 0))) {
  setMeProp(_me, "m_iCounter", lingoBinary("add", meProp(_me, "m_iCounter"), 1));
  if (lingoBinary("eq", lingoBinary("mod", meProp(_me, "m_iSpeed"), meProp(_me, "m_iSpeed")), 0)) {
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iCurrentVortex", lingoBinary("mod", lingoBinary("add", meProp(_me, "m_iCurrentVortex"), 1), meProp(_me, "m_ar_vortexanimation").count));
  setThePropOf(meProp(_me, "m_rVortex"), "member", meProp(_me, "m_ar_vortexanimation")[lingoBinary("add", meProp(_me, "m_iCurrentVortex"), 1)]);
  setThePropOf(meProp(_me, "m_rVortex"), "width", meProp(_me, "m_rVortex").member.width);
  setThePropOf(meProp(_me, "m_rVortex"), "height", meProp(_me, "m_rVortex").member.height);
  }

  }

  }

}

