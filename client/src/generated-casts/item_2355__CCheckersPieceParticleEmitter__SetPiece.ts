// item_2355.cct / CCheckersPieceParticleEmitter / SetPiece

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPiece(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  setMeProp(_me, "m_rPiece", a_rPiece);
  for (var t_rSprite of meProp(_me, "m_ar_rSprites").toArray()) {
  callMethod("add", meProp(_me, "m_ar_rSpritePool"), t_rSprite)
  }

  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  if (lingoBinary("lt", meProp(_me, "m_ar_rSpritePool").count, meProp(_me, "m_iMaxParticles"))) {
  while (lingoBinary("lt", meProp(_me, "m_ar_rSpritePool").count, meProp(_me, "m_iMaxParticles"))) {
  t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this)));
  setThePropOf(t_rSprite, "member", meProp(_me, "m_rMember"));
  setThePropOf(t_rSprite, "visible", 0);
  setThePropOf(t_rSprite, "width", meProp(_me, "m_rMember").width);
  setThePropOf(t_rSprite, "height", meProp(_me, "m_rMember").height);
  callMethod("add", meProp(_me, "m_ar_rSpritePool"), t_rSprite)
  }

  }

  callNamed("receiveUpdate", callMethod("getID", _this))
}

