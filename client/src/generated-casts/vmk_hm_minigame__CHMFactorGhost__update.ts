// vmk_hm_minigame.cct / CHMFactorGhost / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  callMethod("update", meProp(_me, "m_rSpring"))
  var t_vePos = callMethod("getPos", meProp(_me, "m_rSpring"));
  callMethod("SetAbsPos", callMethod("getObject", _me), t_vePos)
}

