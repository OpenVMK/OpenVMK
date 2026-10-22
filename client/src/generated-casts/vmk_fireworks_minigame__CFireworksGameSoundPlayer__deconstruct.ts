// vmk_fireworks_minigame.cct / CFireworksGameSoundPlayer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("stop", meProp(_me, "m_rMusicChannel"))
  callMethod("stop", meProp(_me, "m_rCrowdChannel"))
  for (var tCh of meProp(_me, "m_ar_rFx1Channel").toArray()) {
  callMethod("stop", tCh)
  }

  for (var tCh of meProp(_me, "m_ar_rFx2Channel").toArray()) {
  callMethod("stop", tCh)
  }

  return 1;
}

