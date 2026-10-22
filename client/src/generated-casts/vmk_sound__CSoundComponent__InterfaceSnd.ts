// vmk_sound.cct / CSoundComponent / InterfaceSnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InterfaceSnd(_me: LingoMe, a_sSoundName: LingoValue) {
  var t_bUiSnd = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  if (t_bUiSnd) {
  var t_Obj = callNamed("createObject", symbol("temp"), "CSoundObject");
  callMethod("Define", t_Obj, a_sSoundName)
  callMethod("SetSoundType", t_Obj, "ui")
  callMethod("PlaySound", t_Obj)
  }

}

