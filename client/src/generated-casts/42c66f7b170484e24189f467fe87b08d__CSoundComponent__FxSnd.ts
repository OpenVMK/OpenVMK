// 42c66f7b170484e24189f467fe87b08d.cct / CSoundComponent / FxSnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FxSnd(_me: LingoMe, a_sSoundName: LingoValue, a_sParam: LingoValue) {
  var t_bUiSnd = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bUiSnd) {
  var t_Obj = callNamed("createObject", symbol("temp"), "CSoundObject");
  callMethod("Define", t_Obj, a_sSoundName)
  callMethod("SetSoundType", t_Obj, "fx")
  if (lingoBinary("neq", a_sParam, undefined)) {
  callMethod("SetParameter", t_Obj, "cut")
  }

  callMethod("PlaySound", t_Obj)
  }

}

