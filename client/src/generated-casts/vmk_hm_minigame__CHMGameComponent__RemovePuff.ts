// vmk_hm_minigame.cct / CHMGameComponent / RemovePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemovePuff(_me: LingoMe, t_rPuff: LingoValue) {
  callMethod("RemoveRoomObject", _me, "hm_puff", callMethod("GetParam", t_rPuff, "Reference"))
  callMethod("deleteOne", meProp(_me, "m_ar_GhostPuffs"), t_rPuff)
}

