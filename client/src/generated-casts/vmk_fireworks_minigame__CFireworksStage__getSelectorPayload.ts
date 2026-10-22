// vmk_fireworks_minigame.cct / CFireworksStage / getSelectorPayload

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSelectorPayload(_me: LingoMe, a_iType: LingoValue) {
  for (var t_rSelector of meProp(_me, "m_ar_mp_selector").toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rSelector[symbol("type")]), a_iType)) {
  return t_rSelector[symbol("name")];
  }

  }

  return "";
}

