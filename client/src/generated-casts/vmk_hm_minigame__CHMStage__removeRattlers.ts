// vmk_hm_minigame.cct / CHMStage / removeRattlers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeRattlers(_me: LingoMe) {
  for (var t_rattler of meProp(_me, "m_ar_rRattlers").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rattler))
  }

  setMeProp(_me, "m_ar_rRattlers", new LingoPropList([]));
}

