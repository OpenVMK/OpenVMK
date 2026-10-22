// vmk_sound.cct / Sound Manager Class / createSoundInstance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createSoundInstance(_me: LingoMe, tMemName: LingoValue, tPriority: LingoValue, tProps: LingoValue) {
  var tObject = callNamed("createObject", symbol("temp"), "Sound Instance Class");
  if (lingoBinary("eq", tObject, 0)) {
  return 0;
  }

  callMethod("Define", tObject, tMemName, tPriority, tProps)
  return tObject;
}

