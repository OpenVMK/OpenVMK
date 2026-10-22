// vmk_sound.cct / Sound Manager Class / StopSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopSound(_me: LingoMe, tID: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  callMethod("cancel", meProp(_me, "pChannelList")[i], tID)
  }

  return 1;
}

