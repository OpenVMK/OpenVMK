// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / checkActiveSpriteSpan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkActiveSpriteSpan(_me: LingoMe) {
  var t_bSearchNext = 0;
  if (lingoBinary("neq", meProp(_me, "m_i_ActiveSpriteSpan"), 0)) {
  var tCurrentSpan = meProp(_me, "m_ar_sprites")[meProp(_me, "m_i_ActiveSpriteSpan")];
  if ((lingoTruthy(callMethod("insideFrameSpan", tCurrentSpan, meProp(_me, "m_i_frameCounter"))) ? 0 : 1)) {
  callMethod("deactivate", tCurrentSpan)
  t_bSearchNext = 1;
  } else {
  }

  } else {
  t_bSearchNext = 1;
  }

  if (t_bSearchNext) {
  if (callMethod("activateNextSpriteSpan", _me)) {
  callMethod("Activate", meProp(_me, "m_ar_sprites")[meProp(_me, "m_i_ActiveSpriteSpan")])
  }

  }

}

