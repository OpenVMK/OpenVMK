// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / playBackControl

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
  for (var t_channel of meProp(_me, "m_pSoundChannels").toArray()) {
  if (callNamed("objectp", callNamed("sound", t_channel))) {
  callMethod("play", callNamed("sound", t_channel))
  }

  }

  break;
case "Stop":
  for (var t_channel of meProp(_me, "m_pSoundChannels").toArray()) {
  if (callNamed("objectp", callNamed("sound", t_channel))) {
  callMethod("stop", callNamed("sound", t_channel))
  }

  }

  break;
  }

}

