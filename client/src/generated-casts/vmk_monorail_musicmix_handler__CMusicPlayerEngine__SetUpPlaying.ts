// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / SetUpPlaying

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
  callMethod("setPlayList", callNamed("sound", a_iTrack), new LingoList([]))
  for (var e = 1; e <= 16; ++e) {
  var t_rMem = meProp(_me, "m_mp_TrackData")[a_iTrack][e];
  if (lingoBinary("eq", t_rMem, 0)) {
  t_rMem = t_rEmptyMem;
  }

  if (lingoBinary("neq", t_rMem, -float(1))) {
  callMethod("queue", callNamed("sound", a_iTrack), t_rMem)
  }

  }

  } else {
  var t_track = 1;
  for (var t_channel of meProp(_me, "m_pSoundChannels").toArray()) {
  callMethod("setPlayList", callNamed("sound", t_channel), new LingoList([]))
  for (var e = 1; e <= meProp(_me, "m_iLastSample"); ++e) {
  t_rMem = meProp(_me, "m_mp_TrackData")[t_track][e];
  if (lingoBinary("eq", t_rMem, 0)) {
  t_rMem = t_rEmptyMem;
  }

  if (lingoBinary("neq", t_rMem, -float(1))) {
  callMethod("queue", callNamed("sound", t_channel), t_rMem)
  }

  }

  t_track = lingoBinary("add", t_track, 1);
  }

  }

}

