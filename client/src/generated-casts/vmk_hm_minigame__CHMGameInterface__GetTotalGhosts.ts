// vmk_hm_minigame.cct / CHMGameInterface / GetTotalGhosts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTotalGhosts(_me: LingoMe, a_iTeam: LingoValue) {
  var t_iGhosts = 0;
  for (var t_ar_roundResults of meProp(_me, "m_ar_roundResults").toArray()) {
  switch (a_iTeam) {
case 1:
  t_iGhosts = lingoBinary("add", t_iGhosts, t_ar_roundResults[2]);
  break;
case 2:
  t_iGhosts = lingoBinary("add", t_iGhosts, t_ar_roundResults[3]);
  break;
  }

  }

  return t_iGhosts;
}

