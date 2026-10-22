// vmk_hm_minigame.cct / CHMVisualSuperGhost / selectSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectSprite(_me: LingoMe) {
  switch (callMethod("GetParam", callMethod("getObject", _me), "Team")) {
case 3:
case 4:
case 5:
  setMeProp(_me, "m_iType", callMethod("GetParam", callMethod("getObject", _me), "Team"));
  break;
  default:
  setMeProp(_me, "m_iType", 3);
  break;
  break;
  }

  setThePropOf(meProp(_me, "m_rGlow"), "member", callNamed("member", "superGhost_glow"));
  setThePropOf(meProp(_me, "m_rGlow"), "width", meProp(_me, "m_rGlow").member.width);
  setThePropOf(meProp(_me, "m_rGlow"), "height", meProp(_me, "m_rGlow").member.height);
}

