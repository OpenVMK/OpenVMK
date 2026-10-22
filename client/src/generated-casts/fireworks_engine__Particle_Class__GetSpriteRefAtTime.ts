// fireworks_engine.cct / Particle Class / GetSpriteRefAtTime

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSpriteRefAtTime(_me: LingoMe, i_fX: LingoValue) {
  var tSprite = meProp(_me, "m_ar_spriteListRef")[1];
  var tt = i_fX;
  if (lingoBinary("gt", tt, meProp(_me, "m_spriteSeq_loopEnd"))) {
  var tLoopLength = lingoBinary("sub", meProp(_me, "m_spriteSeq_loopEnd"), meProp(_me, "m_spriteSeq_loopStart"));
  if (lingoBinary("gt", tLoopLength, float(0))) {
  var tOverTime = lingoBinary("sub", tt, meProp(_me, "m_spriteSeq_loopEnd"));
  var tHowManyLoops = callNamed("floor", lingoBinary("div", tOverTime, tLoopLength));
  tt = lingoBinary("add", lingoBinary("sub", tOverTime, lingoBinary("mul", tHowManyLoops, tLoopLength)), meProp(_me, "m_spriteSeq_loopStart"));
  }

  }

  for (var i = 1; i <= meProp(_me, "m_ar_spriteListRef").count; ++i) {
  var t_fTimeLow = meProp(_me, "m_ar_spriteListAtTime")[i];
  var t_fTimeHigh = meProp(_me, "m_ar_spriteListAtTime")[lingoBinary("add", i, 1)];
  if (lingoBinary("and", lingoBinary("lt", t_fTimeLow, tt), lingoBinary("lt", tt, t_fTimeHigh))) {
  tSprite = meProp(_me, "m_ar_spriteListRef")[i];
  break;
  }

  }

  return tSprite;
}

