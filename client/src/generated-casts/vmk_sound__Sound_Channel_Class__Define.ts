// vmk_sound.cct / Sound Channel Class / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tChannelNum: LingoValue) {
  setMeProp(_me, "pChannelNum", tChannelNum);
  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  if (lingoBinary("neq", callNamed("ilk", tChannel), symbol("instance"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid sound channel:", meProp(_me, "pChannelNum")), symbol("play"));
  }

  setMeProp(_me, "pDurationLeft", 0);
  setMeProp(_me, "pCounter", 0);
  return 1;
}

