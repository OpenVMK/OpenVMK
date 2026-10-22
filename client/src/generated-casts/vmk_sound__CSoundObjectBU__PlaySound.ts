// vmk_sound.cct / CSoundObjectBU / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_iSoundChannel"))) {
  for (var i = 1; i <= 8; ++i) {
  if (lingoBinary("eq", callNamed("sound", i).status, 0)) {
  setMeProp(_me, "m_iSoundChannel", i);
  break;
  }

  }

  } else {
  if (lingoBinary("neq", callNamed("sound", meProp(_me, "m_iSoundChannel")).status, 0)) {
  for (var i = 1; i <= 8; ++i) {
  if (lingoBinary("eq", callNamed("sound", i).status, 0)) {
  setMeProp(_me, "m_iSoundChannel", i);
  break;
  }

  }

  }

  }

  if (callNamed("voidp", meProp(_me, "m_iSoundChannel"))) {
  setMeProp(_me, "m_iSoundChannel", 1);
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_iSoundChannel"))) ? 0 : 1), callNamed("objectp", callNamed("sound", meProp(_me, "m_iSoundChannel"))))) {
  var t_bStatus = callMethod("CheckTypeStatus", _me);
  if (t_bStatus) {
  callNamed("call", symbol("queue"), new LingoList([callNamed("sound", meProp(_me, "m_iSoundChannel"))]), meProp(_me, "m_mpSndProps"))
  callNamed("call", symbol("play"), new LingoList([callNamed("sound", meProp(_me, "m_iSoundChannel"))]))
  }

  } else {
  callNamed("put", "All soundchannels in use!")
  return 0;
  }

}

