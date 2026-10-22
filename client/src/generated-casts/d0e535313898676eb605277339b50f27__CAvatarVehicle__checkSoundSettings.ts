// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / checkSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSoundSettings(_me: LingoMe) {
  var t_bFx = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if ((lingoTruthy(t_bFx) ? 0 : 1)) {
  callMethod("setFxOff", _me)
  }

}

