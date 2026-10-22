// vmk_sound.cct / CSoundChannelObject / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue, a_rSndObj: LingoValue, a_sPref: LingoValue) {
  var t_mp_SndDAta = callMethod("getSoundProps", a_rSndObj);
  var t_iLoopCount = 0;
  var t_rSndMem = t_mp_SndDAta.member;
  if (t_rSndMem.loop) {
  setMeProp(_me, "m_bInfiniteLoop", 1);
  setMeProp(_me, "m_iChannelStatus", 1);
  setMeProp(_me, "m_sNowPlaying", t_rSndMem.name);
  callNamed("call", symbol("queue"), new LingoList([meProp(_me, "m_r_SndChannel")]), t_mp_SndDAta)
  callNamed("call", symbol("play"), new LingoList([meProp(_me, "m_r_SndChannel")]), t_mp_SndDAta)
  return 1;
  }

  setMeProp(_me, "m_bInfiniteLoop", 0);
  if (callMethod("findPos", t_mp_SndDAta, symbol("loopCount"))) {
  t_iLoopCount = t_mp_SndDAta.loopCount;
  }

  var t_bStatus = callMethod("CheckTypeStatus", _this);
  if (t_bStatus) {
  setMeProp(_me, "m_sSoundType", callMethod("GetSoundType", a_rSndObj));
  if (lingoBinary("gt", t_iLoopCount, 0)) {
  setMeProp(_me, "m_iDuration", lingoBinary("mul", t_rSndMem.duration, t_iLoopCount));
  } else {
  setMeProp(_me, "m_iDuration", t_rSndMem.duration);
  }

  setMeProp(_me, "m_iCounter", 0);
  callMethod("TimeLeft", _this)
  setMeProp(_me, "m_sNowPlaying", t_rSndMem.name);
  callNamed("call", symbol("queue"), new LingoList([meProp(_me, "m_r_SndChannel")]), t_mp_SndDAta)
  callNamed("call", symbol("play"), new LingoList([meProp(_me, "m_r_SndChannel")]))
  } else {
  setMeProp(_me, "m_sSoundType", callMethod("GetSoundType", a_rSndObj));
  if (lingoBinary("gt", t_iLoopCount, 0)) {
  setMeProp(_me, "m_iDuration", lingoBinary("mul", t_rSndMem.duration, t_iLoopCount));
  } else {
  setMeProp(_me, "m_iDuration", t_rSndMem.duration);
  }

  setMeProp(_me, "m_iCounter", 0);
  callMethod("TimeLeft", _this)
  callMethod("setPlayList", meProp(_me, "m_r_SndChannel"), new LingoList([]))
  setMeProp(_me, "m_sNowPlaying", t_rSndMem.name);
  callNamed("call", symbol("queue"), new LingoList([meProp(_me, "m_r_SndChannel")]), t_mp_SndDAta)
  callNamed("call", symbol("play"), new LingoList([meProp(_me, "m_r_SndChannel")]), t_mp_SndDAta)
  }

}

