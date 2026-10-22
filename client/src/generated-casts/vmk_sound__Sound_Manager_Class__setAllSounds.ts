// vmk_sound.cct / Sound Manager Class / setAllSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllSounds(_me: LingoMe, tvalue: LingoValue) {
  if (tvalue) {
  setMeProp(_me, "pMuted", 0);
  } else {
  setMeProp(_me, "pMuted", 1);
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  callMethod("reset", meProp(_me, "pChannelList")[i])
  }

  }

  return 1;
}

