// vmk_furniture_code.cct / CRoomItemSound / checkSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSoundSettings(_me: LingoMe, _this: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  var t_bFx = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  var t_bUi = callMethod("get", callNamed("getObject", symbol("session")), "ui");
  var t_iVolume = callMethod("get", callNamed("getObject", symbol("session")), "volume");
  if ((lingoTruthy(t_bMusic) ? 0 : 1)) {
  callMethod("StopSound", _this)
  } else {
  callMethod("PlaySound", _this)
  }

}

