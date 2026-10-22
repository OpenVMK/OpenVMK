// vmk_monorail_mixer.cct / CMusicMixerComponent / StartPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartPreview(_me: LingoMe, a_sInst: LingoValue, a_iSampleNum: LingoValue) {
  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 2))) {
  var t_rCurrentSample = callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 2)));
  }

  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 4))) {
  t_rCurrentSample = callNamed("member", callNamed("getmemnum", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sInst, "_"), a_iSampleNum), "_"), 4)));
  }

  if (lingoBinary("neq", t_rCurrentSample, 0)) {
  callMethod("setPlayList", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), 6)), new LingoList([]))
  callMethod("queue", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), 6)), t_rCurrentSample)
  callMethod("play", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), 6)), t_rCurrentSample)
  } else {
  callNamed("put", lingoBinary("joinPad", "Could not find sample", new LingoList([a_sInst, a_iSampleNum])))
  }

}

