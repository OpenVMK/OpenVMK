// vmk_tutorial.cct / CJungleCruiseGameSoundPlayer / camera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function camera(_me: LingoMe, a_rSound: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callNamed("call", symbol("stop"), new LingoList([meProp(_me, "m_rCameraChannel")]))
  callNamed("call", symbol("play"), new LingoList([meProp(_me, "m_rCameraChannel")]), new LingoPropList([symbol("member"), a_rSound]))
  }

}

