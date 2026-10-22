// vmk_hm_minigame.cct / CCollisionEngine / getLink

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLink(_me: LingoMe, t_vPos: LingoValue, t_vDir: LingoValue) {
  var t_iIndex = callMethod("getPos", meProp(_me, "m_ar_directions"), t_vDir);
  if (lingoBinary("lt", t_iIndex, 1)) {
  callNamed("put", "LINK PROBLEM")
  return 0;
  }

  for (var t_link of meProp(_me, "m_ar_links")[t_iIndex].toArray()) {
  if (lingoBinary("eq", t_link[1], t_vPos)) {
  return t_link[2];
  }

  }

  return 0;
}

