// vmk_sound.cct / Sound Channel Class / getTimeRemaining

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTimeRemaining(_me: LingoMe) {
  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  if ((lingoTruthy(callMethod("isBusy", tChannel)) ? 0 : 1)) {
  return 0;
  }

  return meProp(_me, "pDurationLeft");
}

