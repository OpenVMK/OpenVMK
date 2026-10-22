// vmk_fireworks_minigame.cct / CFireworksGameComponent / SendScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendScore(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_hitList").count, 0)) {
  var tMsg = new LingoList([]);
  callMethod("append", tMsg, meProp(_me, "m_ar_hitList").count)
  for (var tHit of meProp(_me, "m_ar_hitList").toArray()) {
  callMethod("append", tMsg, tHit.hit)
  callMethod("append", tMsg, tHit.selectedType)
  callMethod("append", tMsg, tHit.id)
  }

  callMethod("append", tMsg, callMethod("GetChecksum", meProp(_me, "m_stage")))
  callNamed("executeMessage", symbol("SendMinigameAction"), 3, tMsg)
  setMeProp(_me, "m_ar_hitList", new LingoList([]));
  }

}

