// item_2355.cct / CCheckersPieceParticleEmitter / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeUpdate", callMethod("getID", _this))
  var t_iCount = meProp(_me, "m_ar_rSprites").count;
  for (var i = 1; i <= t_iCount; ++i) {
  callNamed("releaseSprite", meProp(_me, "m_ar_rSprites")[i].spriteNum)
  }

  setMeProp(_me, "m_ar_rSprites", undefined);
  t_iCount = meProp(_me, "m_ar_rSpritePool").count;
  for (var i = 1; i <= t_iCount; ++i) {
  callNamed("releaseSprite", meProp(_me, "m_ar_rSpritePool")[i].spriteNum)
  }

  setMeProp(_me, "m_ar_rSpritePool", undefined);
}

