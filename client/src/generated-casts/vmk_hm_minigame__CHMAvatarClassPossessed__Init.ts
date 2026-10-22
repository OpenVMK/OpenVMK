// vmk_hm_minigame.cct / CHMAvatarClassPossessed / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, i_iTeam: LingoValue, i_iDir: LingoValue) {
  switch (callNamed("value", i_iTeam)) {
case 1:
  setMeProp(_me, "m_iTeam", 2);
  setThePropOf(meProp(_me, "m_rGlow"), "member", callNamed("member", "purpleGhost_glow"));
  break;
case 2:
  setMeProp(_me, "m_iTeam", 1);
  setThePropOf(meProp(_me, "m_rGlow"), "member", callNamed("member", "greenGhost_glow"));
  break;
  }

  setThePropOf(meProp(_me, "m_rGlow"), "width", meProp(_me, "m_rGlow").member.width);
  setThePropOf(meProp(_me, "m_rGlow"), "height", meProp(_me, "m_rGlow").member.height);
}

