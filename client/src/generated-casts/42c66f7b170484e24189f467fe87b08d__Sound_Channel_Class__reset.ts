// 42c66f7b170484e24189f467fe87b08d.cct / Sound Channel Class / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  var tChannel = callNamed("sound", meProp(_me, "pChannelNum"));
  callMethod("setPlayList", tChannel, new LingoList([]))
  callMethod("stop", tChannel)
  return 1;
}

