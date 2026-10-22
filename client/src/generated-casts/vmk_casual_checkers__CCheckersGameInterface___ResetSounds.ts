// vmk_casual_checkers.cct / CCheckersGameInterface / _ResetSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ResetSounds(_me: LingoMe, _this: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  var t_bEffects = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  var t_iVolume = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  var t_rSound = callNamed("getObject", meProp(_me, "m_sSound"));
  if (callNamed("objectp", t_rSound)) {
  if (t_bMusic) {
  callMethod("Define", t_rSound, "checkers-game-loop")
  callMethod("SetSoundType", t_rSound, "music")
  callMethod("setLoopCount", t_rSound, 1000)
  callMethod("PlaySound", t_rSound)
  } else {
  callMethod("StopSound", t_rSound)
  }

  }

}

