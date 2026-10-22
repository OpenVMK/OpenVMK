// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / activateNextSpriteSpan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateNextSpriteSpan(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "m_ar_sprites").count; ++i) {
  var tSprite = meProp(_me, "m_ar_sprites")[i];
  if (callMethod("insideFrameSpan", tSprite, meProp(_me, "m_i_frameCounter"))) {
  setMeProp(_me, "m_i_ActiveSpriteSpan", i);
  return 1;
  }

  }

  setMeProp(_me, "m_i_ActiveSpriteSpan", 0);
  return 0;
}

