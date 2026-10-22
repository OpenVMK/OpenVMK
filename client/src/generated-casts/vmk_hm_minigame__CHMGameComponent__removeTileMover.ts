// vmk_hm_minigame.cct / CHMGameComponent / removeTileMover

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeTileMover(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rMyAvatarMover"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rMyAvatarMover")))
  }

}

