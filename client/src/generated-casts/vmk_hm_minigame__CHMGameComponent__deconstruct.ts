// vmk_hm_minigame.cct / CHMGameComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("put", "CHMGameComponent::Deconstruct - begin")
  callMethod("set", callNamed("getObject", symbol("session")), "tileSelectMode", symbol("bsp"))
  if (meProp(_me, "m_bPrepared")) {
  callMethod("UnprepareRoom", _me)
  }

  for (var t_rPuff of meProp(_me, "m_ar_GhostPuffs").toArray()) {
  callMethod("RemovePuff", _me, t_rPuff)
  }

  setMeProp(_me, "m_ar_GhostPuffs", new LingoList([]));
  callMethod("removeAllDoors", _me)
  callNamed("put", "CHMGameComponent::Deconstruct - end")
  return 1;
}

