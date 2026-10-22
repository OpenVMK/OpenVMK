// vmk_casual_checkers.cct / CCheckersPieceParticleEmitter / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rMember", callNamed("getMember", "trick_2_star"));
  setMeProp(_me, "m_vLastPos", callNamed("vector"));
  setMeProp(_me, "m_iMaxParticles", 20);
  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  setMeProp(_me, "m_ar_rSpritePool", new LingoList([]));
}

