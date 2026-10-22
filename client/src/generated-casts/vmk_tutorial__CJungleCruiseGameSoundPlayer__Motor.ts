// vmk_tutorial.cct / CJungleCruiseGameSoundPlayer / Motor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Motor(_me: LingoMe, a_rSound: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (t_bOn) {
  callNamed("call", symbol("stop"), new LingoList([meProp(_me, "m_rMusicChannel")]))
  callNamed("call", symbol("play"), new LingoList([meProp(_me, "m_rMusicChannel")]), new LingoPropList([symbol("member"), a_rSound]))
  }

}

