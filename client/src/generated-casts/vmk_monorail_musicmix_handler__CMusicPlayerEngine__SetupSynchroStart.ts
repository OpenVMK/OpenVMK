// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / SetupSynchroStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetupSynchroStart(_me: LingoMe) {
  var t_rEmptyMem = callNamed("member", callNamed("getmemnum", "emptySnd"));
  for (var t_channel of meProp(_me, "m_pSoundChannels").toArray()) {
  callMethod("setPlayList", callNamed("sound", t_channel), new LingoList([]))
  if (lingoBinary("neq", t_rEmptyMem, -float(1))) {
  callMethod("queue", callNamed("sound", t_channel), t_rEmptyMem)
  }

  }

}

