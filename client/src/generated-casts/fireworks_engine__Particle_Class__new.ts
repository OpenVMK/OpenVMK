// fireworks_engine.cct / Particle Class / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, i_spriteSeq: LingoValue, i_velocity: LingoValue, i_ageLimit: LingoValue, i_position: LingoValue, i_randomAmount: LingoValue) {
  setMeProp(_me, "m_removeFlag", 0);
  setMeProp(_me, "m_pSpriteRef", undefined);
  setMeProp(_me, "m_mp_spriteSeq", new LingoPropList([]));
  setMeProp(_me, "m_spriteSeq_loopStart", float(0));
  setMeProp(_me, "m_spriteSeq_loopEnd", float(0));
  setMeProp(_me, "m_fAge", float(0));
  setMeProp(_me, "m_fAgeLimit", float(0));
  var m_fVelocity = callNamed("vector", 0, 0, 0);
  setMeProp(_me, "m_vPosition", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_ar_spriteListRef", new LingoList([]));
  setMeProp(_me, "m_ar_spriteListAtTime", new LingoList([]));
  var m_fRandomAmount = float(0);
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  if (callNamed("ilk", i_velocity, symbol("vector"))) {
  setMeProp(_me, "m_vVelocity", i_velocity);
  }

  if (callNamed("ilk", i_ageLimit, symbol("number"))) {
  setMeProp(_me, "m_fAgeLimit", i_ageLimit);
  }

  if (callNamed("ilk", i_position, symbol("vector"))) {
  setMeProp(_me, "m_vPosition", i_position);
  }

  if (callNamed("ilk", i_randomAmount, symbol("number"))) {
  setMeProp(_me, "m_fRandomMotion", i_randomAmount);
  }

  if (callNamed("ilk", i_spriteSeq, symbol("linearList"))) {
  if (lingoBinary("lt", i_spriteSeq.count, 1)) {
  callNamed("error", "Sprite Sequence lenght must be 1 or more", symbol("new"))
  }

  setMeProp(_me, "m_pSpriteRef", callMethod("getaProp", i_spriteSeq[1], symbol("sprite")));
  setMeProp(_me, "m_mp_spriteSeq", i_spriteSeq);
  var tCurrentTime = float(0);
  for (var tListEntry of meProp(_me, "m_mp_spriteSeq").toArray()) {
  var tLength = callMethod("getaProp", tListEntry, symbol("ms"));
  if ((lingoTruthy(callNamed("voidp", tLength)) ? 0 : 1)) {
  callMethod("append", meProp(_me, "m_ar_spriteListRef"), callMethod("getaProp", tListEntry, symbol("sprite")))
  callMethod("append", meProp(_me, "m_ar_spriteListAtTime"), tCurrentTime)
  tCurrentTime = lingoBinary("add", tCurrentTime, lingoBinary("mul", tLength, 0.001));
  setMeProp(_me, "m_spriteSeq_loopEnd", tCurrentTime);
  continue;
  }

  var tLoopFrame = callMethod("getaProp", tListEntry, symbol("loop"));
  for (var i = 2; i <= tLoopFrame; ++i) {
  setMeProp(_me, "m_spriteSeq_loopStart", lingoBinary("add", meProp(_me, "m_spriteSeq_loopStart"), lingoBinary("mul", callMethod("getaProp", meProp(_me, "m_mp_spriteSeq")[i], symbol("ms")), 0.001)));
  }

  }

  callMethod("append", meProp(_me, "m_ar_spriteListAtTime"), meProp(_me, "m_spriteSeq_loopEnd"))
  }

  }

  return _me;
}

