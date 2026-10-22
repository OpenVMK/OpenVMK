// vmk_hm_minigame.cct / CCollisionEngine / getTrialDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTrialDirection(_me: LingoMe, t_vOldDir: LingoValue, t_iRotDir: LingoValue) {
  var t_iPos = callMethod("getPos", meProp(_me, "m_ar_directions"), t_vOldDir);
  var t_newPos = lingoBinary("add", t_iPos, t_iRotDir);
  if (lingoBinary("lt", t_newPos, 1)) {
  t_newPos = meProp(_me, "m_ar_directions").count;
  }

  if (lingoBinary("gt", t_newPos, meProp(_me, "m_ar_directions").count)) {
  t_newPos = 1;
  }

  return meProp(_me, "m_ar_directions")[t_newPos];
}

