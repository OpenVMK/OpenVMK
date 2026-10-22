// vmk_casual_checkers.cct / CCheckersPieceParticleEmitter / PlaceParticles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaceParticles(_me: LingoMe, _this: LingoValue, a_vPos: LingoValue) {
  var t_iCount = meProp(_me, "m_ar_rSprites").count;
  for (var i = t_iCount; i >= 1; --i) {
  var t_rSprite = meProp(_me, "m_ar_rSprites")[i];
  setThePropOf(t_rSprite, "blend", lingoBinary("sub", t_rSprite.blend, 10));
  if (lingoBinary("lt", t_rSprite.blend, 10)) {
  callMethod("deleteAt", meProp(_me, "m_ar_rSprites"), i)
  callMethod("add", meProp(_me, "m_ar_rSpritePool"), t_rSprite)
  }

  }

  for (var i = 1; i <= 3; ++i) {
  if (meProp(_me, "m_ar_rSpritePool").count) {
  t_rSprite = meProp(_me, "m_ar_rSpritePool")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_rSpritePool"), 1)
  } else {
  if (meProp(_me, "m_ar_rSprites").count) {
  t_rSprite = meProp(_me, "m_ar_rSprites")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_rSprites"), 1)
  } else {
  callNamed("nothing")
  }

  }

  setThePropOf(t_rSprite, "loc", callNamed("point", lingoBinary("add", a_vPos.x, callNamed("random", -float(10), 10)), lingoBinary("add", a_vPos.y, callNamed("random", -float(10), 10))));
  setThePropOf(t_rSprite, "locZ", lingoBinary("add", a_vPos.z, 1000));
  setThePropOf(t_rSprite, "visible", 1);
  setThePropOf(t_rSprite, "blend", 90);
  var t_iScale = callNamed("random", lingoBinary("div", meProp(_me, "m_rMember").width, 2));
  setThePropOf(t_rSprite, "width", lingoBinary("sub", meProp(_me, "m_rMember").width, t_iScale));
  setThePropOf(t_rSprite, "height", lingoBinary("sub", meProp(_me, "m_rMember").height, t_iScale));
  callMethod("add", meProp(_me, "m_ar_rSprites"), t_rSprite)
  }

}

