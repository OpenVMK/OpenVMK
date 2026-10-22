// vmk_hm_minigame.cct / CHMStage / getARattler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getARattler(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_rRattlers").count, 0)) {
  var t_rattler = meProp(_me, "m_ar_rRattlers")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_rRattlers"), 1)
  return t_rattler;
  } else {
  return 0;
  }

}

