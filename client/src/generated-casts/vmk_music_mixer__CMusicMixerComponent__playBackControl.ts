// vmk_music_mixer.cct / CMusicMixerComponent / playBackControl

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playBackControl(_me: LingoMe, a_sAction: LingoValue) {
  switch (a_sAction) {
case "Play":
  callMethod("SetUpPlaying", _me)
  for (var i = 1; i <= 5; ++i) {
  if (callNamed("objectp", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)))) {
  callMethod("play", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)))
  }

  }

  break;
case "Stop":
  for (var i = 1; i <= 5; ++i) {
  if (callNamed("objectp", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)))) {
  callMethod("stop", callNamed("sound", lingoBinary("add", meProp(_me, "m_iFirstSoundChannel"), i)))
  }

  }

  break;
  }

}

