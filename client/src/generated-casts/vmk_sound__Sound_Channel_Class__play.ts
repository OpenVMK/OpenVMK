// vmk_sound.cct / Sound Channel Class / play

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function play(_me: LingoMe, tSoundObj: LingoValue) {
  var tmember = callMethod("getMember", tSoundObj);
  if (lingoBinary("eq", tmember, 0)) {
  return 0;
  }

  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  if (callMethod("getProperty", tSoundObj, symbol("infiniteloop"))) {
  var tLoopCount = theProperty("maxinteger");
  } else {
  tLoopCount = callMethod("getProperty", tSoundObj, symbol("loopCount"));
  }

  if (lingoBinary("neq", tLoopCount, undefined)) {
  setThePropOf(tChannel, "loopCount", tLoopCount);
  } else {
  tLoopCount = 1;
  }

  var tVolume = callMethod("getProperty", tSoundObj, symbol("volume"));
  if (lingoBinary("neq", tVolume, undefined)) {
  }

  setMeProp(_me, "pDurationLeft", lingoBinary("add", meProp(_me, "pDurationLeft"), lingoBinary("mul", tmember.duration, tLoopCount)));
  callMethod("play", tChannel, tmember)
  return 1;
}

