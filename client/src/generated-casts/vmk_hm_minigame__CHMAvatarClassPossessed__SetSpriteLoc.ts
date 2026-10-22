// vmk_hm_minigame.cct / CHMAvatarClassPossessed / SetSpriteLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSpriteLoc(_me: LingoMe, i_vLoc: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_rSpr"), callNamed("sprite", 0))) {
  setThePropOf(meProp(_me, "m_rSpr"), "loc", callNamed("point", i_vLoc.x, i_vLoc.y));
  setThePropOf(meProp(_me, "m_rSpr"), "locZ", i_vLoc.z);
  }

}

