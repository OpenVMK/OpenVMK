// vmk_hm_minigame.cct / CHMCoffinRattler / updatepos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatepos(_me: LingoMe, t_deltaPos: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_rBlocks").count; ++i) {
  var t_vOrgPos = callMethod("GetScrPos", meProp(_me, "m_rBlocks")[i]);
  var t_pOrgPos = callNamed("point", t_vOrgPos.x, t_vOrgPos.y);
  var tSprite = meProp(_me, "m_rSprites")[i];
  setThePropOf(tSprite, "loc", lingoBinary("add", t_pOrgPos, t_deltaPos));
  }

  callMethod("updateCounter", _me)
}

