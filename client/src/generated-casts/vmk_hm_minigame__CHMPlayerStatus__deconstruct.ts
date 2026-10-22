// vmk_hm_minigame.cct / CHMPlayerStatus / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var team of meProp(_me, "m_ar_teams").toArray()) {
  callNamed("releaseSprite", team[1].spriteNum)
  if (lingoBinary("gt", team.count, 1)) {
  if (lingoBinary("eq", callNamed("ilk", team[2]), symbol("member"))) {
  callNamed("removeMember", team[2].name)
  continue;
  }

  if (lingoBinary("eq", callNamed("ilk", team[2]), symbol("sprite"))) {
  callNamed("releaseSprite", team[2].spriteNum)
  }

  }

  }

  for (var t_rArrow of meProp(_me, "m_ar_arrows").toArray()) {
  callNamed("releaseSprite", t_rArrow.spriteNum)
  }

  return 1;
}

