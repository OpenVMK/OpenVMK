// vmk_hm_minigame.cct / CHMStage / rattle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rattle(_me: LingoMe, t_sRef: LingoValue, i_iCoffinAction: LingoValue) {
  var tPos = callMethod("findPos", meProp(_me, "m_ar_rRattlers"), t_sRef);
  if (lingoBinary("neq", tPos, 0)) {
  callMethod("setState", meProp(_me, "m_ar_rRattlers")[tPos], symbol("rattle"), i_iCoffinAction)
  }

}

