// vmk_tutorial.cct / CJungleCruiseGameSoundPlayer / deconstruct

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
  callMethod("stop", meProp(_me, "m_rGuideChannel"))
  callMethod("stop", meProp(_me, "m_rAtmosChannel"))
  callMethod("stop", meProp(_me, "m_rCameraChannel"))
  callMethod("stop", meProp(_me, "m_rMotorSound"))
  for (var tCh of meProp(_me, "m_ar_rFxChannel").toArray()) {
  callMethod("stop", tCh)
  }

  return 1;
}

