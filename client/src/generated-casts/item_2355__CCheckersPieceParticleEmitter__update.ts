// item_2355.cct / CCheckersPieceParticleEmitter / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_rPiece").valid) {
  var t_vNewPos = callMethod("GetScrPos", meProp(_me, "m_rPiece"));
  if (lingoBinary("neq", meProp(_me, "m_vLastPos"), t_vNewPos)) {
  callMethod("PlaceParticles", _this, t_vNewPos)
  setThePropOf(meProp(_me, "m_vLastPos"), "x", t_vNewPos.x);
  setThePropOf(meProp(_me, "m_vLastPos"), "y", t_vNewPos.y);
  setThePropOf(meProp(_me, "m_vLastPos"), "z", t_vNewPos.z);
  }

  } else {
  callNamed("removeObject", callMethod("getID", _this))
  }

}

