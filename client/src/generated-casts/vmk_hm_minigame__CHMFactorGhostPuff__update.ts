// vmk_hm_minigame.cct / CHMFactorGhostPuff / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_bInit")) {
  var t_vDestination = callMethod("GetAbsPos", meProp(_me, "m_rAvatar"));
  var t_vLoc = callMethod("GetAbsPos", callMethod("getObject", _me));
  var t_vDelta = lingoBinary("sub", t_vDestination, t_vLoc);
  var t_vNewPos = lingoBinary("add", t_vLoc, lingoBinary("div", t_vDelta, 10));
  callMethod("SetAbsPos", callMethod("getObject", _me), t_vNewPos)
  }

}

