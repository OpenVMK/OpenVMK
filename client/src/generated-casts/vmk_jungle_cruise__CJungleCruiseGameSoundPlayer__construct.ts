// vmk_jungle_cruise.cct / CJungleCruiseGameSoundPlayer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iCurFXChannel", 1);
  setMeProp(_me, "m_ar_rFxChannel", new LingoList([callNamed("sound", 1), callNamed("sound", 2), callNamed("sound", 3)]));
  setMeProp(_me, "m_rCameraChannel", callNamed("sound", 4));
  setMeProp(_me, "m_rGuideChannel", callNamed("sound", 5));
  setMeProp(_me, "m_rMusicChannel", callNamed("sound", 6));
  setMeProp(_me, "m_rAtmosChannel", callNamed("sound", 7));
  setMeProp(_me, "m_rMotorSound", callNamed("sound", 8));
  return 1;
}

