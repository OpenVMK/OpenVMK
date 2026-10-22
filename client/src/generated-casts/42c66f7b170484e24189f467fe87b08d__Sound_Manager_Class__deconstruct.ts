// 42c66f7b170484e24189f467fe87b08d.cct / Sound Manager Class / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("set_all_sounds"), callMethod("getID", _me))
  for (var i = 1; i <= meProp(_me, "pChannelCount"); ++i) {
  var tObject = callMethod("getChannel", _me, i);
  if (lingoBinary("neq", tObject, 0)) {
  callMethod("reset", tObject)
  }

  }

  setMeProp(_me, "pChannelList", undefined);
  setMeProp(_me, "pChannelCount", undefined);
  return 1;
}

