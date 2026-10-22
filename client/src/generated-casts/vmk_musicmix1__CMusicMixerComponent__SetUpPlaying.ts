// vmk_musicmix1.cct / CMusicMixerComponent / SetUpPlaying

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetUpPlaying(_me: LingoMe, a_iTrack: LingoValue) {
  var t_rEmptyMem = callNamed("member", callNamed("getmemnum", "emptySnd"));
  if ((lingoTruthy(callNamed("voidp", a_iTrack)) ? 0 : 1)) {
  a_iTrack = callNamed("value", a_iTrack);
  callMethod("setPlayList", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), a_iTrack)), new LingoList([]))
  for (var e = 1; e <= 16; ++e) {
  var t_rMem = meProp(_me, "m_mp_TrackData")[a_iTrack][e];
  if (lingoBinary("eq", t_rMem, 0)) {
  t_rMem = t_rEmptyMem;
  }

  if (lingoBinary("neq", t_rMem, -float(1))) {
  callMethod("queue", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), a_iTrack)), t_rMem)
  }

  }

  } else {
  for (var i = 1; i <= 4; ++i) {
  callMethod("setPlayList", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)), new LingoList([]))
  for (var e = 1; e <= 16; ++e) {
  t_rMem = meProp(_me, "m_mp_TrackData")[i][e];
  if (lingoBinary("eq", t_rMem, 0)) {
  t_rMem = t_rEmptyMem;
  }

  if (lingoBinary("neq", t_rMem, -float(1))) {
  callMethod("queue", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)), t_rMem)
  }

  }

  }

  callMethod("setPlayList", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), 5)), new LingoList([]))
  for (var g = 1; g <= 17; ++g) {
  if (lingoBinary("eq", g, 16)) {
  var rtshft = -float(8);
  } else {
  rtshft = 0;
  }

  callMethod("queue", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), 5)), new LingoPropList([symbol("member"), t_rEmptyMem, symbol("startTime"), 0, symbol("endTime"), 1777, symbol("loopStartTime"), 0, symbol("loopEndTime"), 1777, symbol("loopCount"), 1, symbol("preloadTime"), 1777, symbol("rateShift"), rtshft]))
  }

  }

}

