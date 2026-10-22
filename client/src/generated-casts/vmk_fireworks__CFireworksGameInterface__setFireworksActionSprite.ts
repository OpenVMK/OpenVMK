// vmk_fireworks.cct / CFireworksGameInterface / setFireworksActionSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFireworksActionSprite(_me: LingoMe, i_index: LingoValue, i_pLoc: LingoValue, i_rMember: LingoValue, a_visible: LingoValue, a_fScale: LingoValue) {
  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i_index], "loc", i_pLoc);
  if (lingoBinary("neq", meProp(_me, "m_ar_fwSpritelist")[i_index].member, i_rMember)) {
  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i_index], "member", i_rMember);
  if ((lingoTruthy(callNamed("voidp", i_rMember)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i_index], "width", i_rMember.image.width);
  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i_index], "height", i_rMember.image.height);
  }

  }

  setThePropOf(meProp(_me, "m_ar_fwSpritelist")[i_index], "visible", a_visible);
}

