// vmk_music_mixer.cct / CMusicMixerComponent / RemoveSample

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveSample(_me: LingoMe, a_iTrack: LingoValue, a_iSlot: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", a_iTrack)) ? 0 : 1), (lingoTruthy(callNamed("voidp", a_iSlot)) ? 0 : 1))) {
  callMethod("playBackControl", _me, "Stop")
  if (lingoBinary("eq", meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot], -float(1))) {
  var t_iPrevPos = lingoBinary("sub", a_iSlot, 1);
  if (lingoBinary("gt", t_iPrevPos, 0)) {
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iPrevPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iPrevPos, 0)
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPrevPos);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos)
  }

  }

  } else {
  var t_iNextPos = lingoBinary("add", a_iSlot, 1);
  if (lingoBinary("lt", t_iNextPos, 17)) {
  var t_iNextSample = meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos];
  if (lingoBinary("eq", t_iNextSample, -float(1))) {
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iNextPos, 0)
  t_iPos = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos)
  }

  }

  }

  }

  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot, 0)
  var t_iPos1 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  if (lingoBinary("gt", t_iPos1, 0)) {
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos1)
  }

  }

}

