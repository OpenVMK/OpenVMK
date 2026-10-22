// 42c66f7b170484e24189f467fe87b08d.cct / Sound Channel Class / queue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function queue(_me: LingoMe, tSoundObj: LingoValue) {
  var tmember = callMethod("getMember", tSoundObj);
  if (lingoBinary("eq", tmember, 0)) {
  return 0;
  }

  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  callMethod("queue", tChannel, tmember)
  return 1;
}

